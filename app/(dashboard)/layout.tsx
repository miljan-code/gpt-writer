import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { UserProfile } from '@/components/dashboard/user-profile';
import { MobileNavigation } from '@/components/dashboard/navigation';
import {
  Navigation,
  NavigationFooter,
} from '@/components/dashboard/navigation';
import { Icons } from '@/components/icons';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { FullscreenContent } from '@/components/dashboard/fullscreen-content';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect('/');

  return (
    <>
      <main className="container relative min-h-screen xl:min-h-[calc(100vh-80px)] mb-10 xl:border xl:border-border/50 xl:bg-border/5 xl:mt-10 xl:rounded-lg xl:before:absolute xl:before:inset-0 xl:before:w-full xl:before:h-full xl:before:shadow-dashboard xl:before:z-[-1] p-0 flex">
        <aside className="lg:visible lg:relative absolute invisible max-w-[13.75rem] w-full border-r border-border/50 py-3 px-4 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-6 my-3">
            <UserProfile currentUser={currentUser} />
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href="/dashboard/credits"
                  className="group h-full aspect-square border border-border rounded-md flex items-center justify-center hover:border-accent transition-colors duration-200"
                >
                  <Icons.coins className="text-muted group-hover:text-accent transition-colors duration-200" />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>Buy credits</HoverCardContent>
            </HoverCard>
          </div>
          <Navigation />
          <div className="mt-auto">
            <NavigationFooter />
          </div>
        </aside>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="lg:hidden border-b border-border/50 px-6 py-4 flex items-center justify-between">
            <MobileNavigation />
            <UserProfile currentUser={currentUser} />
          </div>
          <section className="relative p-6 w-full h-full">{children}</section>
        </div>
      </main>
      <FullscreenContent />
    </>
  );
}
