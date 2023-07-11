import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { clerkClient, currentUser } from '@clerk/nextjs';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    let { prompt: content } = await req.json();

    content = content.replace(/\/$/, '').slice(-5000) as string;

    const price = 1;

    if ((user.publicMetadata.credits as number) < price) {
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
            'You are an AI writing assistant that writes articles based on provided SEO keywords, article titles, article outlines, and writing tone.' +
            'Format your responses in Markdown format, to actually look like an article and always finish responses with new line break.' +
            'Limit your response to no more than 190 words, but make sure to construct complete sentences.',
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

    await clerkClient.users.updateUser(user.id, {
      publicMetadata: {
        credits: (user.publicMetadata.credits as number) - price,
      },
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}
