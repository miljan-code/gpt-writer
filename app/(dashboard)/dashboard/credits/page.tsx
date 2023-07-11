import { CreditPlans } from '@/components/dashboard/account/credit-plans';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Credits',
  description: 'Simple pricing, 1 credit = up to 200 words',
};

export default function CreditsPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="font-heading text-3xl">Get More Credits</h2>
        <p className="text-muted">
          Simple pricing: 1 credit = up to 200 words.
        </p>
      </div>
      <CreditPlans />
    </>
  );
}
