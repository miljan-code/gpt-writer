import { Icons } from '@/components/icons';

export interface Service {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}
