import { format } from 'date-fns';
import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { payment, prompt } from '@/db/schema';
import { getCurrentUser } from '@/lib/session';
import { wordsPerCredit } from '@/config/credit-plans';
import { Icons } from '@/components/icons';
import type { Prompt, Statistic } from '@/types/db';
import type {
  CalculatedStats,
  MonthByMonthStats,
  StatsOutput,
} from '@/types/stats';

export async function getStatistics() {
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

  const userStats = calculateStats({ currentUser, prompts, payments });

  const monthByMonthStats = calculateMonthByMonth({
    currentUser,
    prompts,
    payments,
  });

  const userStatsCards = transformStatsIntoCards(userStats, monthByMonthStats);

  return userStatsCards;
}

function calculateStats(stats: Statistic): CalculatedStats {
  const averageCreditPrice =
    stats.payments
      .map(payment => +payment.price / payment.amount)
      .reduce((acc, cur) => acc + cur, 0) / stats.payments.length;

  const spentCredits = stats.prompts
    .map(prompt => prompt.price)
    .reduce((acc, cur) => acc + cur, 0);

  const promptsToReturn = 6;
  const recentPrompts = stats.prompts.slice(-promptsToReturn);

  return {
    totalCredits: stats.currentUser.credits,
    totalCreditsUSD:
      +(averageCreditPrice * stats.currentUser.credits).toFixed(2) || 0,
    spentCredits,
    totalPrompts: stats.prompts.length,
    totalWordsLeft: wordsPerCredit * stats.currentUser.credits,
    totalWordsGenerated: wordsPerCredit * spentCredits,
    pricePerWord: +(averageCreditPrice / wordsPerCredit).toFixed(5) || 0,
    pricePerPrompt:
      +((spentCredits / stats.prompts.length) * averageCreditPrice).toFixed(
        2
      ) || 0,
    recentPrompts,
    prompts: stats.prompts,
  };
}

function transformStatsIntoCards(
  stats: CalculatedStats,
  monthByMonthStats: MonthByMonthStats
): StatsOutput | null {
  const recentPrompts = transformRecentPrompts(stats.recentPrompts);

  const spentByMonth = calculateSpentCreditsByMonth(stats.prompts);

  return {
    cards: [
      {
        title: 'Total Credits',
        label: `${stats.totalCredits}`,
        sublabel: `${monthByMonthStats.totalCreditsBoughtThisMonth} new bought this month`,
        icon: 'coins',
      },
      {
        title: 'Total Credits in USD',
        label: `${stats.totalCreditsUSD}$`,
        sublabel: `${monthByMonthStats.totalCreditsBoughtThisMonthUSD}$ spent this month`,
        icon: 'dollar',
      },
      {
        title: 'Spent Credits',
        label: `${stats.spentCredits}`,
        sublabel: `${monthByMonthStats.totalSpentThisMonth} spent this month`,
        icon: 'circleDollar',
      },
      {
        title: 'Total Prompts',
        label: `${stats.totalPrompts}`,
        sublabel: `${monthByMonthStats.totalPromptsThisMonth} generated this month`,
        icon: 'terminal',
      },
      {
        title: 'Total Words Left',
        label: `~${(stats.totalWordsLeft / 1000).toFixed()}k`,
        sublabel: `${
          monthByMonthStats.totalWordsAddedThisMonth / 1000
        }k added this month`,
        icon: 'coins',
      },
      {
        title: 'Total Words Generated',
        label: `~${stats.totalWordsGenerated}`,
        sublabel: `${monthByMonthStats.totalWordsGeneratedThisMonth} this month`,
        icon: 'coins',
      },
      {
        title: 'Price per Word',
        label: `${stats.pricePerWord}$`,
        sublabel: 'Depends on bought amount',
        icon: 'coins',
      },
      {
        title: 'Price per Prompt',
        label: `${stats.pricePerPrompt}$`,
        sublabel: 'Depends on bought amount',
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

function calculateSpentCreditsByMonth(prompts: Prompt[]) {
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

function calculateMonthByMonth(stats: Statistic) {
  const [currentMonthPrompts] = filterCurrentAndLastMonth(stats.prompts);

  const [currentMonthPayments] = filterCurrentAndLastMonth(stats.payments);

  const totalCreditsBoughtThisMonth = currentMonthPayments.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  const totalCreditsBoughtThisMonthUSD = currentMonthPayments.reduce(
    (acc, cur) => acc + +cur.price,
    0
  );

  const totalSpentThisMonth = currentMonthPrompts.reduce(
    (acc, cur) => acc + cur.price,
    0
  );

  const totalPromptsThisMonth = currentMonthPrompts.length;

  const totalWordsAddedThisMonth = totalCreditsBoughtThisMonth * wordsPerCredit;

  const totalWordsGeneratedThisMonth = totalSpentThisMonth * wordsPerCredit;

  return {
    totalCreditsBoughtThisMonth,
    totalCreditsBoughtThisMonthUSD,
    totalSpentThisMonth,
    totalPromptsThisMonth,
    totalWordsAddedThisMonth,
    totalWordsGeneratedThisMonth,
  };
}

function filterCurrentAndLastMonth<T extends { createdAt: Date }>(
  arr: Array<T>
) {
  const currentMonth = new Date().getMonth();

  const currMonthArr = arr.filter(i => i.createdAt.getMonth() === currentMonth);
  const lastMonthArr = arr.filter(
    i => i.createdAt.getMonth() === currentMonth - 1
  );

  return [currMonthArr, lastMonthArr];
}
