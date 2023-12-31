import { z } from 'zod';

export interface IUser {
    email: string;
    name: string;
    surname: string;
    password: string;
}

export type IUserBody = IUser & {
    confirmPassword: string;
};

export type IUserResponse = {
    id: number;
    accessToken: string;
    refreshToken: string;
} & Omit<IUser, 'password'>;

export type IUserLoginBody = {
    email: string;
    password: string;
};

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

export const signInSchema = z
    .object({
        email: z.string().email('Niepoprawny format adresu e-mail'),
        password: z.string().nonempty({ message: 'Hasło jest wymagane' }),
    })
    .refine((data) => data.email !== '', {
        message: 'Adres e-mail jest wymagany',
        path: ['email'],
    });
