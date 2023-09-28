import { FieldValue } from 'react-hook-form';
import { z } from 'zod';

export const signUpSchema = z
    .object({
        name: z.string(),
        surname: z.string(),
        email: z.string().email(),
        password: z
            .string()
            .min(10, 'Hasło powinno mieć co najmniej 10 znaków'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Hasła muszą się zgadzać',
        path: ['confirmPassword'],
    });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
