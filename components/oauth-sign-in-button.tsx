'use client';

import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface OAuthSignInButtonProps {
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
}

export const OAuthSignInButton = ({
  isLoading,
  setIsLoading,
}: OAuthSignInButtonProps) => {
  const oauthSignIn = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
      redirect('/dashboard');
    } catch (error) {
      // toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      rounded="md"
      className="w-full"
      onClick={oauthSignIn}
      disabled={isLoading}
    >
      <Icons.google className="h-4 w-4" />
      <span>Continue with Google</span>
    </Button>
  );
};
