import { Icons } from '@/components/icons';
import type { StatCard } from '@/types/config';
import type { Prompt } from '@/types/db';

export type RecentPrompts = Pick<Prompt, 'id' | 'createdAt' | 'price'> & {
  title: string;
  icon: keyof typeof Icons;
};

export interface Overview {
  name: string;
  total: number;
}

export interface StatsOutput {
  cards: StatCard[];
  recentPrompts: RecentPrompts[];
  overview: Overview[];
}

export interface CalculatedStats {
  totalCredits: number;
  totalCreditsUSD: number;
  spentCredits: number;
  totalPrompts: number;
  totalWordsLeft: number;
  totalWordsGenerated: number;
  pricePerWord: number;
  pricePerPrompt: number;
  recentPrompts: Prompt[];
  prompts: Prompt[];
}

export interface MonthByMonthStats {
  totalCreditsBoughtThisMonth: number;
  totalCreditsBoughtThisMonthUSD: number;
  totalSpentThisMonth: number;
  totalPromptsThisMonth: number;
  totalWordsAddedThisMonth: number;
  totalWordsGeneratedThisMonth: number;
}
