import { CreditPlans } from '@/components/dashboard/credit-plans';

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
