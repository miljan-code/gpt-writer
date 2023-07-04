import * as z from 'zod';
import { creditPlanSchema } from '@/lib/validations/plan';

type CreditPlan = z.infer<typeof creditPlanSchema>;

export const creditPlans: CreditPlan[] = [
  {
    id: 0,
    creditAmount: 100,
    price: 6.99,
    maxWords: 20,
    stripePriceId: 'STRIPE_PLAN_100',
  },
  {
    id: 1,
    creditAmount: 200,
    price: 11.99,
    maxWords: 40,
    stripePriceId: 'STRIPE_PLAN_200',
  },
  {
    id: 2,
    creditAmount: 350,
    price: 16.99,
    maxWords: 70,
    stripePriceId: 'STRIPE_PLAN_350',
  },
  {
    id: 3,
    creditAmount: 500,
    price: 19.99,
    maxWords: 100,
    stripePriceId: 'STRIPE_PLAN_500',
  },
];
