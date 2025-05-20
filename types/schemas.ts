import { z } from 'zod'

export const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .trim()
      .min(3, 'username has at least 3 characters')
      .max(30, 'username  has at most 3 characters'),
    userAt: z
      .string()
      .trim()
      .min(3, 'userAt has at least 3 characters')
      .max(30, 'userAt  has at most 3 characters'),
    password: z
      .string()
      .trim()
      .min(6, 'password has at least 6 characters')

      .max(30, 'password  has at most 3 characters'),
    passwordConfirm: z.string(),
  })
  .refine((doc) => doc.password === doc.passwordConfirm, {
    message: "Password and confirm password don't matches.",
    path: ['passwordConfirm'],
  })
