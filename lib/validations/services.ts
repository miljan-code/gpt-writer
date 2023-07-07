import * as z from 'zod';

export const articleWriterFormSchema = z.object({
  keywords: z
    .string({
      required_error: 'Please add some keywords',
    })
    .min(3, {
      message: 'Keywords must be at least 3 characters',
    })
    .max(30, {
      message: 'Keywords must be no longer than 30 characters',
    }),
  title: z
    .string({
      required_error: 'Please add article title',
    })
    .min(3, {
      message: 'Article title must be at least 3 characters',
    })
    .max(50, {
      message: 'Article title must be no longer than 50 characters',
    }),
  outline: z
    .array(
      z.object({
        value: z.string().optional(),
      })
    )
    .optional(),
  tone: z.string({
    required_error: 'Please select an article writing tone',
  }),
});
