import { Icons } from '@/components/icons';

interface DashboardNavLink {
  icon: keyof typeof Icons;
  href: string;
  label: string;
}

interface DashboardNav {
  title: string;
  links: DashboardNavLink[];
}

export interface DashboardConfig {
  nav: DashboardNav[];
}
