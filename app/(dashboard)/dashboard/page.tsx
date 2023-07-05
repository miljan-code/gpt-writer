import { DateRangePicker } from '@/components/dashboard/date-range-picker';
import { Overview } from '@/components/dashboard/overview';
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
  return (
    <>
      <Tabs defaultValue="overview">
        {/* TABS */}
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
        {/* CONTENT */}
        <TabsContent value="overview" className="pt-5 flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Total Credits
                </h3>
                <Icons.coins size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">30</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Total Credits in USD
                </h3>
                <Icons.dollar size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">$23.84</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Spent Credits
                </h3>
                <Icons.circleDollar size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">14</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Total Prompts
                </h3>
                <Icons.terminal size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">104</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
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
                <Overview />
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
                {[0, 1, 2, 3, 4, 5].map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full border border-border/50 flex items-center justify-center h-9 w-9">
                        <Icons.languages size={18} />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">Grammar Checker</p>
                        <span className="text-xs text-muted">
                          03. July 2023
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        -30 <span className="hidden sm:inline">credits</span>
                      </span>
                      <Icons.coins size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Total Words Left
                </h3>
                <Icons.coins size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">30</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Total Words Generated
                </h3>
                <Icons.dollar size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">$23.84</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Price per Word
                </h3>
                <Icons.circleDollar size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">14</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
            <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm tracking-tight font-medium text-accent">
                  Total Prompts
                </h3>
                <Icons.terminal size={14} className="text-accent" />
              </div>
              <span className="text-2xl font-bold">104</span>
              <span className="text-xs text-muted">
                10% more than last month
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
