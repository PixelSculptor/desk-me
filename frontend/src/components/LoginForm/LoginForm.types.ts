import { z } from 'zod';

export const signInSchema = z
    .object({
        email: z.string().trim().email('Niepoprawny format adresu e-mail'),
        password: z.string().trim().nonempty({ message: 'Hasło jest wymagane' }),
    })
    .refine((data) => data.email !== '', {
        message: 'Adres e-mail jest wymagany',
        path: ['email'],
    });

export type TSignInSchema = z.infer<typeof signInSchema>;
