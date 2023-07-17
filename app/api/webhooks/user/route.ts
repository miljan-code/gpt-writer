import {
  Webhook,
  WebhookRequiredHeaders,
  WebhookVerificationError,
} from 'svix';
import { headers } from 'next/headers';
import { createId } from '@paralleldrive/cuid2';
import { eq, DrizzleError } from 'drizzle-orm';
import { db } from '@/db';
import { account, user } from '@/db/schema';
import type {
  UserJSON,
  WebhookEventType,
  ObjectType,
} from '@clerk/clerk-sdk-node';

interface Event {
  data: UserJSON;
  object: ObjectType;
  type: WebhookEventType;
}

async function handler(req: Request) {
  try {
    const body = await req.json();
    const heads = {
      'svix-id': headers().get('svix-id'),
      'svix-timestamp': headers().get('svix-timestamp'),
      'svix-signature': headers().get('svix-signature'),
    };

    if (!process.env.CLERK_WEBHOOK_SECRET) {
      return new Response(null, { status: 403 });
    }

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let event: Event | null = null;

    event = webhook.verify(
      JSON.stringify(body),
      heads as WebhookRequiredHeaders
    ) as Event;

    if (!event) {
      return new Response(null, { status: 400 });
    }

    if (event.type === 'user.created') {
      const { id, ...attributes } = event.data as UserJSON;

      await db
        .insert(account)
        .values({ id: createId(), userId: id, attributes });

      const [accountDB] = await db
        .select()
        .from(account)
        .where(eq(account.userId, id))
        .limit(1);

      await db.insert(user).values({
        id,
        accountId: accountDB.id,
        email: attributes.email_addresses[0].email_address,
        firstName: attributes.first_name,
        lastName: attributes.last_name,
        imageUrl: attributes.image_url,
        credits: 30,
      });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return new Response(error.message, { status: 400 });
    }

    if (error instanceof DrizzleError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
