import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    TSignInSchema,
    signInSchema,
} from '@components/LoginForm/LoginForm.types';
import { isUserResponse } from '@/types/guards/isUserResponse';
import { isClientError } from '@/types/guards/isClientError';
import { getUserSuccess } from '@/store/user/user.reducer';

import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import { ErrorMessage } from '../Error/Error';

import styles from './LoginForm.module.scss';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValidating },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState('');

    const onSubmit = async ({ email, password }: TSignInSchema) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const responseData: unknown = await response.json();

        if (response.ok && isUserResponse(responseData)) {
            dispatch(getUserSuccess(responseData));
            navigate('/');
        } else if (!response.ok && isClientError(responseData)) {
            const { cause, code } = responseData;

            setLoginError(`${cause}\n
            Kod błędu: ${code}`);
        } else {
            setLoginError('Coś poszło nie tak');
        }
        reset();
    };

    return (
        <section className={styles['login']}>
            <form
                className={styles['login__form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    id="email"
                    label="Adres E-mail"
                    placeholder="adam.kowalski@gmail.com"
                    required
                    register={register}
                    error={errors.email}
                />
                <InputField
                    id="password"
                    label="Hasło"
                    placeholder="********"
                    type="password"
                    required
                    register={register}
                    error={errors.password}
                />

                <Button
                    disabled={isSubmitting || isValidating}
                    fullWidth
                    type="submit"
                >
                    Zaloguj się
                </Button>
                {loginError && <ErrorMessage message={loginError} />}
            </form>
        </section>
    );
}
