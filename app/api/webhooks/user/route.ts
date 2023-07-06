import {
  Webhook,
  WebhookRequiredHeaders,
  WebhookVerificationError,
} from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs';

async function handler(req: Request) {
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

  try {
    event = webhook.verify(
      JSON.stringify(body),
      heads as WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof WebhookVerificationError) {
      errorMessage = error.message;
      return new Response(errorMessage, { status: 400 });
    }
  }

  if (!event) {
    return new Response(null, { status: 400 });
  }

  if (event.type === 'user.created') {
    const userId = event.data.id as string;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        credits: 30,
      },
    });
  }

  return new Response(null, { status: 200 });
}

type EventType = 'user.created';

type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
