import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});
export type SignUpData = z.infer<typeof SignUpSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
});
export type LoginData = z.infer<typeof LoginSchema>;
