import { DashboardConfig } from '@/types/dashboard';

export const dashboardConfig: DashboardConfig = {
  nav: [
    {
      title: 'Services',
      links: [
        {
          icon: 'dashboard',
          label: 'Dashboard',
          href: '/dashboard',
        },
        {
          icon: 'languages',
          label: 'Grammar Checker',
          href: '/grammar-checker',
        },
        {
          icon: 'repeat',
          label: 'Paraphraser',
          href: '/paraphraser',
        },
        {
          icon: 'edit',
          label: 'Article Writer',
          href: '/article-writer',
        },
        {
          icon: 'wand',
          label: 'SEO Wizard',
          href: '/seo-wizard',
        },
        {
          icon: 'textFile',
          label: 'Text Summarizer',
          href: '/text-summarizer',
        },
      ],
    },
    {
      title: 'Account',
      links: [
        {
          icon: 'settings',
          label: 'Settings',
          href: '/dashboard/settings',
        },
        {
          icon: 'receipt',
          label: 'Credits',
          href: '/dashboard/credits',
        },
      ],
    },
  ],
};
