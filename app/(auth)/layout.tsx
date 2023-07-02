import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <main className="pt-nav-height">
        <section className="relative before:absolute before:h-[400px] before:container before:left-1/2 before:-translate-x-1/2 before:pointer-events-none before:z-[1] before:bg-header-gradient before:-top-nav-height">
          {children}
        </section>
      </main>
      <Footer />
    </>
  );
}
