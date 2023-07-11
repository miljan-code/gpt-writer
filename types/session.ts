import { InferModel } from 'drizzle-orm';
import { user } from '@/db/schema';

export type User = InferModel<typeof user>;
