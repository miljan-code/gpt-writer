'use client';

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
import type { User } from '@/types/session';
import { UploadButton } from './upload-button';

interface UpdateProfileProps {
  currentUser: User;
}

type FormData = z.infer<typeof updateProfileSchema>;

export const UpdateProfile = ({ currentUser }: UpdateProfileProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      oldPassword: undefined,
      newPassword: undefined,
      imageUrl: undefined,
    },
    mode: 'onSubmit',
  });

  const onSubmit = (formData: FormData) => {
    const formValues = form.getValues();
    console.log(formValues);
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
                  src={profileImageUrl || currentUser.imageUrl}
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  placeholder={currentUser.email}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex md:items-start flex-col md:flex-row md:justify-between gap-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="tertiary" rounded="md" type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
};
