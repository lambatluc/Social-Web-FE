import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'invalidEmail' }).min(1, 'emptyEmail'),
  password: z.string().trim().min(1, 'emptyPassword').min(6, { message: 'passwordMinLength' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;