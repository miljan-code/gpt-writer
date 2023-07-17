import { format } from 'date-fns';
import { asc, eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/session';
import { wordsPerCredit } from '@/config/credit-plans';
import { db } from '@/db';
import { payment, prompt } from '@/db/schema';
import { Icons } from '@/components/icons';
import type { Prompt, Statistic } from '@/types/db';
import type { StatCard } from '@/types/config';

export const getUserData = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const prompts = await db
    .select()
    .from(prompt)
    .where(eq(prompt.userId, currentUser.id))
    .orderBy(asc(prompt.createdAt));

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
    totalCreditsUSD:
      (averageCreditPrice * data.currentUser.credits).toFixed(2) || 0,
    spentCredits,
    totalPrompts: data.prompts.length,
    totalWordsLeft: wordsPerCredit * data.currentUser.credits,
    totalWordsGenerated: wordsPerCredit * spentCredits,
    pricePerWord: (averageCreditPrice / wordsPerCredit).toFixed(5) || 0,
    pricePerPrompt:
      ((spentCredits / data.prompts.length) * averageCreditPrice).toFixed(2) ||
      0,
    recentPrompts,
    prompts: data.prompts,
  };
}

type RecentPrompts = Pick<Prompt, 'id' | 'createdAt' | 'price'> & {
  title: string;
  icon: keyof typeof Icons;
};

export type Overview = {
  name: string;
  total: number;
};

interface StatsOutput {
  cards: StatCard[];
  recentPrompts: RecentPrompts[];
  overview: Overview[];
}

export async function getStatisticsForUser(): Promise<StatsOutput | null> {
  const stats = await calculateStatsForUser();

  if (!stats) return null;

  const recentPrompts = transformRecentPrompts(stats.recentPrompts);

  const spentByMonth = calculateCreditsByMonth(stats.prompts);

  return {
    cards: [
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
        label: `~${(stats.totalWordsLeft / 1000).toFixed()}k`,
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
    ],
    recentPrompts: recentPrompts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a?.createdAt).getTime();
    }),
    overview: spentByMonth,
  };
}

function transformRecentPrompts(recentPrompts: Prompt[]) {
  return recentPrompts.map(prompt => {
    const nonChangedFields = {
      id: prompt.id,
      price: prompt.price,
      createdAt: prompt.createdAt,
    };

    if (prompt.service === 'grammar') {
      return {
        title: 'Grammar Checker',
        icon: 'languages' as keyof typeof Icons,
        ...nonChangedFields,
      };
    }
    if (prompt.service === 'article') {
      return {
        title: 'Article Writer',
        icon: 'languages' as keyof typeof Icons,
        ...nonChangedFields,
      };
    }
    if (prompt.service === 'paraphrase') {
      return {
        title: 'Paraphraser',
        icon: 'languages' as keyof typeof Icons,
        ...nonChangedFields,
      };
    }
    if (prompt.service === 'seo') {
      return {
        title: 'SEO Wizard',
        icon: 'languages' as keyof typeof Icons,
        ...nonChangedFields,
      };
    }
    if (prompt.service === 'summarize') {
      return {
        title: 'Text Summarizer',
        icon: 'languages' as keyof typeof Icons,
        ...nonChangedFields,
      };
    }
    return {
      title: 'Grammar Checker',
      icon: 'languages' as keyof typeof Icons,
      ...nonChangedFields,
    };
  });
}

function calculateCreditsByMonth(prompts: Prompt[]) {
  const sumByMonth: { [month: string]: number } = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  prompts.forEach(prompt => {
    const month = format(prompt.createdAt, 'MMM');
    if (sumByMonth[month]) {
      sumByMonth[month] += prompt.price;
    } else {
      sumByMonth[month] = prompt.price;
    }
  });

  return Object.keys(sumByMonth).map(month => ({
    name: month,
    total: sumByMonth[month],
  }));
}
