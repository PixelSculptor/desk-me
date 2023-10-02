import { z } from 'zod';

export interface IUser {
    email: string;
    name: string;
    surname: string;
    password: string;
    token: string;
}

export type IUserBody = Omit<IUser, 'token'> & {
    confirmPassword: string;
};

export type IUserResponse = {
    id: number;
} & Omit<IUser, 'password'>;

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
