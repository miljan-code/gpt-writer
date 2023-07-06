import { getCurrentUser } from '@/lib/session';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header currentUser={currentUser} />
      <main className="pt-nav-height">{children}</main>
      <Footer />
    </>
  );
}
