import * as z from 'zod';

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters long',
    })
    .max(50)
    .optional(),
  lastName: z
    .string({
      required_error: 'Please enter your last name',
    })
    .min(2, {
      message: 'Last name must be at least 2 characters long',
    })
    .max(50)
    .optional(),
  imageUrl: z
    .string()
    .url({
      message: 'Please provide valid URL',
    })
    .optional(),
});
