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

export interface Service {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

export interface StatCard {
  title: string;
  label: string;
  sublabel: string;
  icon: keyof typeof Icons;
}
