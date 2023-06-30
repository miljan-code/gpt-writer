import { authFeatureItems } from '@/config/auth-features';
import { SignUpForm } from '@/components/sign-up-form';
import { AuthFeature } from '@/components/auth-feature';

export default function SignUpPage() {
  return (
    <div className="relative container pt-16 flex flex-col items-center">
      <div className="max-w-[51.25rem] w-full p-6 border border-border/50 rounded-lg bg-border/20 flex justify-between">
        <div className="px-6 w-full flex flex-col gap-12 pt-12">
          {authFeatureItems.map(feature => (
            <AuthFeature key={feature.label} {...feature} />
          ))}
        </div>
        <div className="px-6 w-full flex flex-col">
          <h2 className="text-lg font-medium mb-0.5">Hello, buddy!</h2>
          <p className="text-sm mb-6 font-light text-accent">
            Sign up to continue to GPT Writer
          </p>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
