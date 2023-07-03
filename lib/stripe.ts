import Stripe from 'stripe';

if (!process.env.STRIPE_API_KEY) {
  throw new Error('STRIPE_API_KEY is missing');
}

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});
