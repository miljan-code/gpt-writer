'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { signInSchema } from '@/lib/validations/auth';
import { Icons } from '@/components/icons';
import { OAuthSignInButton } from '@/components/oauth-sign-in-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type FormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const signInResult = await signIn('credentials', {
      ...formData,
      redirect: false,
    });

    if (signInResult?.error) {
      if (signInResult.error.includes('email')) {
        form.setError('email', {
          message: signInResult.error,
        });
      }
      if (signInResult.error.includes('password')) {
        form.setError('password', {
          message: signInResult.error,
        });
      }

      setIsLoading(false);
      return;
    }

    router.refresh();
    router.replace('/dashboard');
    setIsLoading(false);
  };

  return (
    <>
      <OAuthSignInButton isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="relative my-8 h-[1px] w-full bg-divider-gradient after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:px-3 after:text-xs after:content-['or']" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hello@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button rounded="md" disabled={isLoading} className="mt-4">
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Continue
            <span className="sr-only">Sign in</span>
          </Button>
        </form>
      </Form>
    </>
  );
};
