'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { isClerkAPIResponseError, useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { verfifyEmailSchema } from '@/lib/validations/auth';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormData = z.infer<typeof verfifyEmailSchema>;

export const VerifyEmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { isLoaded: isAuthLoaded, signUp, setActive } = useSignUp();

  const form = useForm<FormData>({
    resolver: zodResolver(verfifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    if (!isAuthLoaded) return null;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: formData.code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        router.push(`${window.location.origin}/dashboard`);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>6-Digit Code</FormLabel>
              <FormControl>
                <Input placeholder="000000" {...field} maxLength={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Verify
          <span className="sr-only">Verify your email</span>
        </Button>
      </form>
    </Form>
  );
};
