import * as z from 'zod';

export const creditPlanSchema = z.object({
  id: z.number(),
  creditAmount: z.number(),
  price: z.number(),
  maxWords: z.number(),
  stripePriceId: z.union([
    z.literal('STRIPE_PLAN_100'),
    z.literal('STRIPE_PLAN_200'),
    z.literal('STRIPE_PLAN_350'),
    z.literal('STRIPE_PLAN_500'),
  ]),
});
