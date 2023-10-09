import { useForm } from 'react-hook-form';

import {
    TSignInSchema,
    signInSchema,
} from '../RegistrationForm/RegistrationForm.types';

import { zodResolver } from '@hookform/resolvers/zod';
import styles from './LoginForm.module.scss';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors, isSubmitting, isValidating },
    } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

    // const onSubmit = async(data: TSignInSchema) => {
    const onSubmit = async () => {
        console.log('login');
    };

    return (
        <section className={styles['login']}>
            <form
                className={styles['login__form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    id="email"
                    label="Imię"
                    placeholder="Adam"
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
            </form>
        </section>
    );
}
