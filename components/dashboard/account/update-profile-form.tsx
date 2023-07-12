'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateProfileSchema } from '@/lib/validations/profile';
import { generateFallback } from '@/lib/utils';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { UploadButton } from '@/components/dashboard/account/upload-button';
import type { User } from '@/types/db';

interface UpdateProfileProps {
  currentUser: User;
}

type FormData = z.infer<typeof updateProfileSchema>;

export const UpdateProfileForm = ({ currentUser }: UpdateProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (formData: FormData) => {
    const formValues = form.getValues();
    const allValuesFalsy = Object.values(formValues).every(value => !value);

    if (allValuesFalsy) return null;

    setIsLoading(true);

    const result = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!result?.ok) {
      setIsLoading(false);
      return toast({
        title: 'Profile not updated',
        description: 'Something went wrong, please try again.',
      });
    }

    setIsLoading(false);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <div className="inline-flex flex-col gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={profileImageUrl || currentUser.imageUrl || ''}
                  alt={currentUser.firstName || ''}
                />
                <AvatarFallback>
                  {generateFallback(
                    `${currentUser.firstName} ${currentUser.lastName}`
                  )}
                </AvatarFallback>
              </Avatar>
              <UploadButton
                form={form}
                onUploadComplete={(url: string) => setProfileImageUrl(url)}
              />
              <FormMessage />
            </div>
          )}
        />
        <div className="flex md:items-start flex-col md:flex-row md:justify-between gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder={currentUser.firstName || ''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder={currentUser.lastName || ''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          variant="tertiary"
          rounded="md"
          type="submit"
          disabled={isLoading}
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
};
