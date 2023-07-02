'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { signUpSchema } from '@/lib/validations/auth';
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
import { toast } from '@/components/ui/use-toast';

type FormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    const signUpResult = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!signUpResult.ok) {
      setIsLoading(false);

      if (signUpResult.status === 409) {
        form.setError('email', {
          message: 'Email address is already in use',
        });
        return;
      }

      toast({
        title: 'Something went wrong',
        description: 'Your account was not created. Please, try again.',
      });
      return;
    }

    const signInResult = await signIn('credentials', {
      ...formData,
      redirect: true,
    });

    if (signInResult?.error) {
      toast({
        title: 'Something went wrong',
        description:
          'Your account is created but you are not signed in. Please, try to sign in again.',
      });
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
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
            <span className="sr-only">Sign up</span>
          </Button>
        </form>
      </Form>
    </>
  );
};
