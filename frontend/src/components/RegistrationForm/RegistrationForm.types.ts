import { z } from 'zod';

export const signUpSchema = z
    .object({
        name: z.string().trim().nonempty({ message: 'Imię jest wymagane' }),
        surname: z.string().trim().nonempty({ message: 'Nazwisko jest wymagane' }),
        email: z.string().trim().email('Niepoprawny format adresu e-mail'),
        password: z.string().min(10, 'Hasło powinno mieć co najmniej 10 znaków'),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Hasła muszą się zgadzać',
        path: ['confirmPassword'],
    });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
