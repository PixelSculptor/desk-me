import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '@components/InputField/InputField';
import { Button } from '@components/Button/Button';

import { TSignUpSchema, signUpSchema } from './RegisterForm.types';

import styles from './RegistrationForm.module.scss';

export const RegistrationForm = function RegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const navigate = useNavigate();

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

        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            // alert("Failed")
        }
        // console.log(responseData);
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
                    disabled={isSubmitting}
                    className={styles['button-cmp']}
                    fullWidth
                    type="submit"
                >
                    Zarejestruj się
                </Button>
            </form>
        </section>
    );
};
