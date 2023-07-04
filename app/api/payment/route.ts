import * as z from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { stripe } from '@/lib/stripe';
import { siteConfig } from '@/config/site';
import { creditPlanSchema } from '@/lib/validations/plan';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 });
    }

    const plan = creditPlanSchema.parse(await req.json());

    if (!plan) {
      return new Response(null, { status: 403 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${siteConfig.url}/dashboard/credits`,
      cancel_url: `${siteConfig.url}/dashboard/credits`,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: session.user.email,
      line_items: [
        {
          price: process.env[plan.stripePriceId],
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          plan: plan.stripePriceId,
          userId: session.user.id,
        },
      },
    });

    return new Response(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
