import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { generateFallback } from '@/lib/utils';
import { dashboardConfig } from '@/config/dashboard';
import { Icons } from '@/components/icons';
import { SignOutButton } from '@/components/sign-out-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  return (
    <main className="container relative min-h-screen xl:min-h-[calc(100vh-80px)] xl:border xl:border-border/50 xl:bg-border/5 xl:mt-10 xl:rounded-lg xl:before:absolute xl:before:inset-0 xl:before:w-full xl:before:h-full xl:before:shadow-dashboard xl:before:z-[-1] p-0 flex">
      <aside className="lg:visible lg:relative absolute invisible max-w-[13.75rem] w-full border-r border-border/50 py-3 px-4 flex flex-col gap-5">
        <div className="flex items-center justify-between mb-6 my-3">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/settings">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={session.user.image || ''}
                  alt={session.user.name || 'Unknown user'}
                />
                <AvatarFallback>
                  {generateFallback(session.user.name || '')}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link href="/dashboard/settings" className="text-sm">
                {session.user.name}
              </Link>
              <Link
                href="/dashboard/credits"
                className="text-xs text-muted hover:underline hover:underline-offset-2"
              >
                0 credits
              </Link>
            </div>
          </div>
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
        {dashboardConfig.nav.map(column => (
          <nav key={column.title} className="flex flex-col gap-1">
            <h3 className="text-xs mb-1 text-muted">{column.title}</h3>
            {column.links.map(link => {
              const Icon = Icons[link.icon];

              return (
                <Link
                  href={link.href}
                  key={link.label}
                  className="group flex items-center gap-2 px-2 py-1 rounded-md hover:bg-border transition-colors duration-100 text-accent cursor-default"
                >
                  <Icon size={16} className="group-hover:text-white" />
                  <p className="text-sm">{link.label}</p>
                </Link>
              );
            })}
            {column.title === 'Account' && <SignOutButton />}
          </nav>
        ))}
        <div className="mt-auto">
          <Link href="#" className="flex items-center gap-2 w-fit">
            <Icons.book size={14} className="text-muted" />
            <span className="text-xs text-muted">Help & Support</span>
          </Link>
          <span className="text-xs text-muted">GPT Writer &copy; 0.1.0</span>
        </div>
      </aside>
      <section className="p-6 w-full">{children}</section>
    </main>
  );
}
