import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/session';
import { wordsPerCredit } from '@/config/credit-plans';
import { db } from '@/db';
import { payment, prompt } from '@/db/schema';
import type { Statistic } from '@/types/db';

export const getUserData = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const prompts = await db
    .select()
    .from(prompt)
    .where(eq(prompt.userId, currentUser.id));

  const payments = await db
    .select()
    .from(payment)
    .where(eq(payment.userId, currentUser.id));

  return { currentUser, prompts, payments } satisfies Statistic;
};

export async function calculateStatsForUser() {
  const data = await getUserData();

  if (!data) return null;

  const averageCreditPrice =
    data.payments
      .map(payment => +payment.price / payment.amount)
      .reduce((acc, cur) => acc + cur, 0) / data.payments.length;

  const spentCredits = data.prompts
    .map(prompt => prompt.price)
    .reduce((acc, cur) => acc + cur, 0);

  const promptsToReturn = 6;
  const recentPrompts = data.prompts.slice(-promptsToReturn);

  return {
    totalCredits: data.currentUser.credits,
    totalCreditsUSD: averageCreditPrice * data.currentUser.credits,
    spentCredits,
    totalPrompts: data.prompts.length,
    totalWordsLeft: wordsPerCredit * data.currentUser.credits,
    totalWordsGenerated: wordsPerCredit * spentCredits,
    pricePerWord: averageCreditPrice / wordsPerCredit,
    pricePerPrompt: spentCredits / data.prompts.length,
    recentPrompts,
  };
}

export async function getStatisticsForUser() {
  const stats = await calculateStatsForUser();

  //
}
