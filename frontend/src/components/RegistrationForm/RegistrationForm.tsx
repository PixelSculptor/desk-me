import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';

import { setUser } from '@/store/user/user.reducer';
import { isUserResponse } from '@/types/guards/isUserResponse';
import { isClientError } from '@/types/guards/isClientError';

import { InputField } from '@components/InputField/InputField';
import { Button } from '@components/Button/Button';
import { ErrorMessage } from '@components/Error/Error';

import { TSignUpSchema, signUpSchema } from './RegistrationForm.types';

import styles from './RegistrationForm.module.scss';

export function RegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValidating },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState('');

    const onSubmit = async (data: TSignUpSchema) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            {
                method: 'POST',
                body: JSON.stringify({
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const responseData: unknown = await response.json();

        if (response.ok && isUserResponse(responseData)) {
            dispatch(setUser(responseData));
            navigate('/');
        } else if (!response.ok && isClientError(responseData)) {
            const { code, cause } = responseData;

            setRegistrationError(`
            ${cause}
            Kod błędu: ${code}`);
        } else {
            setRegistrationError('Coś poszło nie tak');
        }
        reset();
    };
    return (
        <section className={styles['registration']}>
            <form
                className={styles['registration__form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    id="name"
                    label="Imię"
                    placeholder="Adam"
                    required
                    register={register}
                    error={errors.name}
                />
                <InputField
                    id="surname"
                    label="Nazwisko"
                    placeholder="Kowalski"
                    required
                    register={register}
                    error={errors.surname}
                />
                <InputField
                    id="email"
                    label="Adres E-Mail"
                    type="email"
                    placeholder="adam.kowalski@gmail.com"
                    required
                    register={register}
                    error={errors.email}
                />
                <InputField
                    id="password"
                    label="Hasło"
                    type="password"
                    placeholder="********"
                    required
                    register={register}
                    error={errors.password}
                />
                <InputField
                    id="confirmPassword"
                    label="Powtórz hasło"
                    type="password"
                    placeholder="********"
                    required
                    register={register}
                    error={errors.confirmPassword}
                />
                <Button
                    disabled={isSubmitting || isValidating}
                    fullWidth
                    type="submit"
                >
                    Zarejestruj się
                </Button>
                {registrationError && (
                    <ErrorMessage message={registrationError} />
                )}
            </form>
        </section>
    );
}
