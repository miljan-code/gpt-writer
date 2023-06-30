import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <main className="pt-nav-height">{children}</main>
      <Footer />
    </>
  );
}
