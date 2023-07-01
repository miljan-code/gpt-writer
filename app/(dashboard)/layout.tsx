import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth-options';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/sign-in');

  return (
    <main className="container relative min-h-[calc(100vh-80px)] border border-border/50 bg-border/5 mt-10 rounded-lg before:absolute before:inset-0 before:w-full before:h-full before:shadow-dashboard before:z-[-1] p-6">
      {children}
    </main>
  );
}
