import { z } from 'zod';

export const signUpSchema = z
    .object({
        name: z.string().nonempty({ message: 'Imię jest wymagane' }),
        surname: z.string().nonempty({ message: 'Nazwisko jest wymagane' }),
        email: z.string().email('Niepoprawny format adresu e-mail'),
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
