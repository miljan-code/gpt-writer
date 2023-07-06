import * as z from 'zod';
import { currentUser } from '@clerk/nextjs';
import { stripe } from '@/lib/stripe';
import { siteConfig } from '@/config/site';
import { creditPlanSchema } from '@/lib/validations/plan';

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
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
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price: process.env[plan.stripePriceId],
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          plan: plan.stripePriceId,
          userId: user.id,
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
