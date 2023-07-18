import { format } from 'date-fns';
import { getStatistics } from '@/lib/statistics';
import { DateRangePicker } from '@/components/dashboard/stats/date-range-picker';
import { Overview } from '@/components/dashboard/stats/overview';
import { DashboardCard } from '@/components/dashboard/stats/dashboard-card';
import { Icons } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const stats = await getStatistics();

  if (!stats) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="border border-border/75 rounded-md p-4 max-w-[25rem] w-full flex flex-col items-center justify-center gap-2">
          <Icons.ban size={64} className="text-muted" />
          <h3 className="text-xl font-semibold text-center">
            Stats have not been loaded
          </h3>
          <p className="text-sm">Please try to refresh page</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Tabs defaultValue="overview">
        <div className="flex flex-col sm:items-center justify-between sm:flex-row max-sm:gap-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <HoverCard>
              <HoverCardTrigger>
                <TabsTrigger value="services" disabled>
                  Services
                </TabsTrigger>
                <TabsTrigger value="payments" disabled>
                  Payments
                </TabsTrigger>
              </HoverCardTrigger>
              <HoverCardContent>Coming soon</HoverCardContent>
            </HoverCard>
          </TabsList>
          <DateRangePicker />
        </div>
        <TabsContent value="overview" className="pt-5 flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {stats.cards.slice(0, 4).map(card => (
              <DashboardCard key={card.title} {...card} />
            ))}
          </div>
          <div className="flex flex-col md:grid gap-6 md:grid-cols-7">
            <div className="border border-border/50 rounded-md w-full pr-3 pb-2 md:col-span-4">
              <div className="p-6 flex flex-col gap-1">
                <h3 className="tracking-tight font-medium text-accent">
                  Overview
                </h3>
                <p className="text-xs text-muted">Credits spent by month</p>
              </div>
              <div className="-ml-1">
                <Overview data={stats.overview} />
              </div>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 md:col-span-3">
              <div className="flex flex-col gap-1">
                <h3 className="tracking-tight font-medium text-accent">
                  Recent Prompts
                </h3>
                <p className="text-xs text-muted">Recently used services</p>
              </div>
              <div className="h-full pt-6 flex flex-col gap-6">
                {stats.recentPrompts.map(prompt => {
                  if (!prompt) return null;

                  const Icon = Icons[prompt.icon];

                  return (
                    <div
                      key={prompt.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full border border-border/50 flex items-center justify-center h-9 w-9">
                          <Icon size={18} />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{prompt.title}</p>
                          <span className="text-xs text-muted">
                            {format(prompt.createdAt, 'dd. MMM yyyy HH:mm')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          -{prompt.price}{' '}
                          <span className="hidden sm:inline">credits</span>
                        </span>
                        <Icons.coins size={16} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {stats.cards.slice(4).map(card => (
              <DashboardCard key={card.title} {...card} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
