import { InferModel } from 'drizzle-orm';
import { user, prompt, payment } from '@/db/schema';

export type User = InferModel<typeof user>;
export type Prompt = InferModel<typeof prompt>;
export type Payment = InferModel<typeof payment>;

export type Statistic = {
  currentUser: User;
  prompts: Prompt[];
  payments: Payment[];
};
