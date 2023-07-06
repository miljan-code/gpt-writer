'use client';

import { useSignIn, useSignUp, isClerkAPIResponseError } from '@clerk/nextjs';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type OAuthProvider = 'oauth_google';
type OAuthType = 'sign-in' | 'sign-up';

interface OAuthSignInButtonProps {
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  type?: OAuthType;
}

export const OAuthButton = ({
  isLoading,
  setIsLoading,
  type = 'sign-in',
}: OAuthSignInButtonProps) => {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();

  const oauthSignIn = async (provider: OAuthProvider) => {
    try {
      setIsLoading(true);

      if (type === 'sign-up') {
        if (!isSignUpLoaded) return null;

        await signUp.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: '/dashboard',
          redirectUrlComplete: '/dashboard',
        });
      } else {
        if (!isSignInLoaded) return null;

        await signIn.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: '/dashboard',
          redirectUrlComplete: '/dashboard',
        });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast({
          title: 'Something went wrong',
          description: error.message,
        });
      }

      toast({
        title: 'Something went wrong',
        description: 'You are not logged in',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      rounded="md"
      className="w-full"
      onClick={() => oauthSignIn('oauth_google')}
      disabled={isLoading}
    >
      <Icons.google className="h-4 w-4" />
      <span>Continue with Google</span>
    </Button>
  );
};
