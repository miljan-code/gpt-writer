import * as z from 'zod';

export const updateProfileSchema = z
  .object({
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
    email: z
      .string()
      .email({
        message: 'Please enter a valid email address',
      })
      .optional(),
    oldPassword: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      })
      .optional(),
    newPassword: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      })
      .optional(),
    imageUrl: z
      .string()
      .url({
        message: 'Please provide valid URL',
      })
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (values.newPassword && !values.oldPassword) {
      ctx.addIssue({
        message: 'Please enter your old password in order to create a new one',
        code: z.ZodIssueCode.custom,
        path: ['oldPassword'],
      });
    }
    if (!values.newPassword && values.oldPassword) {
      ctx.addIssue({
        message: 'Please enter new password in order to change it',
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
      });
    }
  });
