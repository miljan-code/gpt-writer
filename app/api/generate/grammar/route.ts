import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { createId } from '@paralleldrive/cuid2';
import { eq, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/db';
import { prompt, user } from '@/db/schema';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response(null, { status: 403 });
    }

    let { prompt: content } = await req.json();

    content = content.replace(/\/$/, '').slice(-5000) as string;

    const price = Math.ceil(content.split(' ').length / 200);

    if (currentUser.credits < price) {
      return new Response('Not enough credits to perform this action.', {
        status: 403,
      });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI writing assistant that checks text for any grammar mistakes, spelling mistakes, or typos and returns correct text.',
        },
        {
          role: 'user',
          content,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    });

    await db.transaction(async tx => {
      await tx
        .update(user)
        .set({ credits: sql`${user.credits} - ${price}` })
        .where(eq(user.id, currentUser.id));
      await tx.insert(prompt).values({
        id: createId(),
        userId: currentUser.id,
        price,
        service: 'grammar',
      });
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}
