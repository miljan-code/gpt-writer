import Link from 'next/link';
import { authFeatureItems } from '@/config/auth-features';
import { SignInForm } from '@/components/sign-in-form';
import { AuthFeature } from '@/components/auth-feature';

export default function SignInPage() {
  return (
    <div className="relative container py-16 md:py-32 flex flex-col items-center">
      <div className="max-w-[51.25rem] w-full p-6 border border-border/50 rounded-lg bg-border/20 flex flex-col justify-between md:flex-row">
        <div className="hidden px-6 w-full md:flex flex-col gap-12 pt-12">
          {authFeatureItems.map(feature => (
            <AuthFeature key={feature.label} {...feature} />
          ))}
        </div>
        <div className="px-6 w-full flex flex-col">
          <h2 className="text-lg font-medium mb-0.5">Welcome back</h2>
          <p className="text-sm mb-6 font-light text-accent">
            Sign in to continue to GPT Writer
          </p>
          <SignInForm />
          <span className="mt-4 text-xs">
            Don&apos;t have account yet?{' '}
            <Link href="/sign-up" className="text-primary">
              Sign up
            </Link>{' '}
            here.
          </span>
        </div>
      </div>
    </div>
  );
}
