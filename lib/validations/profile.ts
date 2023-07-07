import * as z from 'zod';

export const updateProfileSchema = z.object({
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
  email: z
    .string({
      required_error: 'Please enter a valid email address',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  oldPassword: z
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
  newPassword: z
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
  imageUrl: z
    .string({
      required_error: 'Please provide valid URL',
    })
    .url({
      message: 'Please provide valid URL',
    }),
});
