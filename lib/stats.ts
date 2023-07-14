import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/session';
import { wordsPerCredit } from '@/config/credit-plans';
import { db } from '@/db';
import { payment, prompt } from '@/db/schema';
import type { Statistic } from '@/types/db';
import { StatCard } from '@/types/config';

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
    totalCreditsUSD: (averageCreditPrice * data.currentUser.credits).toFixed(2),
    spentCredits,
    totalPrompts: data.prompts.length,
    totalWordsLeft: wordsPerCredit * data.currentUser.credits,
    totalWordsGenerated: wordsPerCredit * spentCredits,
    pricePerWord: (averageCreditPrice / wordsPerCredit).toFixed(5),
    pricePerPrompt: (
      (spentCredits / data.prompts.length) *
      averageCreditPrice
    ).toFixed(2),
    recentPrompts,
  };
}

export async function getStatisticsForUser(): Promise<StatCard[] | null> {
  const stats = await calculateStatsForUser();

  if (!stats) return null;

  return [
    {
      title: 'Total Credits',
      label: `${stats.totalCredits}`,
      sublabel: '10% more than last month',
      icon: 'coins',
    },
    {
      title: 'Total Credits in USD',
      label: `${stats.totalCreditsUSD}$`,
      sublabel: '10% more than last month',
      icon: 'dollar',
    },
    {
      title: 'Spent Credits',
      label: `${stats.spentCredits}`,
      sublabel: '10% more than last month',
      icon: 'circleDollar',
    },
    {
      title: 'Total Prompts',
      label: `${stats.totalPrompts}`,
      sublabel: '10% more than last month',
      icon: 'terminal',
    },
    {
      title: 'Total Words Left',
      label: `~${stats.totalWordsLeft}`,
      sublabel: '10% more than last month',
      icon: 'coins',
    },
    {
      title: 'Total Words Generated',
      label: `~${stats.totalWordsGenerated}`,
      sublabel: '10% more than last month',
      icon: 'coins',
    },
    {
      title: 'Price per Word',
      label: `${stats.pricePerWord}$`,
      sublabel: '10% more than last month',
      icon: 'coins',
    },
    {
      title: 'Price per Prompt',
      label: `${stats.pricePerPrompt}$`,
      sublabel: '10% more than last month',
      icon: 'coins',
    },
  ];
}
