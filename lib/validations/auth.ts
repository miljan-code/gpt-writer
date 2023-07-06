import * as z from 'zod';

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email address',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  password: z
    .string({
      required_error: 'Please enter a valid password',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
});

export const signUpSchema = signInSchema.extend({
  firstName: z
    .string({
      required_error: 'Please enter your first name',
    })
    .min(2, {
      message: 'First name must be at least 2 characters long',
    })
    .max(50),
  lastName: z
    .string({
      required_error: 'Please enter your last name',
    })
    .min(2, {
      message: 'Last name must be at least 2 characters long',
    })
    .max(50),
  confirmPassword: z
    .string({
      required_error: 'Please confirm your password',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
});

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Verification code must be 6 characters long',
    })
    .max(6),
});
