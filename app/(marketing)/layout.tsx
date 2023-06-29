import { Header } from '@/components/header';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />
      <main className="pt-nav-height">{children}</main>
    </>
  );
}
