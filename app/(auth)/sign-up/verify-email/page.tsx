import { authFeatureItems } from '@/config/auth-features';
import { AuthFeature } from '@/components/auth/auth-feature';
import { VerifyEmailForm } from '@/components/auth/verify-email-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify email',
  description: 'Verify your email address to continue with your sign up',
};

export default function SignUpPage() {
  return (
    <div className="relative container py-16 md:py-24 flex flex-col items-center">
      <div className="max-w-[51.25rem] w-full px-6 py-12 border border-border/50 rounded-lg bg-border/20 flex flex-col justify-between items-center md:flex-row">
        <div className="hidden px-6 w-full md:flex flex-col gap-12">
          {authFeatureItems.map(feature => (
            <AuthFeature key={feature.label} {...feature} />
          ))}
        </div>
        <div className="px-6 w-full flex flex-col">
          <h2 className="text-lg font-medium mb-0.5">Verify email 📧</h2>
          <p className="text-sm mb-6 font-light text-accent">
            Check your inbox to complete registration
          </p>
          <VerifyEmailForm />
        </div>
      </div>
    </div>
  );
}
