'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isClerkAPIResponseError, useSignIn } from '@clerk/nextjs';
import { signInSchema } from '@/lib/validations/auth';
import { Icons } from '@/components/icons';
import { OAuthButton } from '@/components/auth/oauth-button';
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

type FormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { isLoaded: isAuthLoaded, signIn, setActive } = useSignIn();

  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (!isAuthLoaded) return null;

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        router.push('/dashboard');
      } else {
        throw new Error(
          'An error occured when setting session, please try again.'
        );
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast({
          title: 'Something went wrong',
          description: error.errors[0]?.longMessage,
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
    <>
      <OAuthButton isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="relative my-8 h-[1px] w-full bg-divider-gradient after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:px-3 after:text-xs after:content-['or'] after:text-muted" />
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
