'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isClerkAPIResponseError, useSignUp } from '@clerk/nextjs';
import { signUpSchema } from '@/lib/validations/auth';
import { Icons } from '@/components/icons';
import { OAuthButton } from '@/components/oauth-button';
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

  const { isLoaded: isAuthLoaded, signUp, setActive } = useSignUp();

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

    if (!isAuthLoaded) return null;

    if (formData.password !== formData.confirmPassword) {
      return form.setError('confirmPassword', {
        message: 'Passwords did not match',
      });
    }

    try {
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        // TODO: MUST VERIFY

        await fetch('/api/auth/user');

        router.push('/dashboard');
      } else {
        throw new Error(
          'An error occured when setting session, please try again.'
        );
      }

      router.push('/dashboard');
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast({
          title: 'Something went wrong',
          description: error.errors[0]?.longMessage,
        });
      }

      if (error instanceof Error) {
        toast({
          title: 'Something went wrong',
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <OAuthButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        type="sign-up"
      />
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
