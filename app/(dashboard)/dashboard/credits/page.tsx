import { CreditPlans } from '@/components/dashboard/credit-plans';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Credits',
  description: 'Simple pricing, 1 credit = up to 200 words',
};

export default function CreditsPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Get More Credits</h2>
        <span className="text-sm text-muted">
          Simple pricing: 1 credit = up to 200 words
        </span>
      </div>
      <CreditPlans />
    </>
  );
}
