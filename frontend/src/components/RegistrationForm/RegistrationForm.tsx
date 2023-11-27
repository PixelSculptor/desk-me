import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import type {} from 'redux-thunk/extend-redux';

import { selectErrorMessage, selectStatus } from '@/store/user/user.selector';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { signUp } from '@/store/user/user.thunk';

import { InputField } from '@components/InputField/InputField';
import { Button } from '@components/Button/Button';
import { ErrorMessage } from '@components/Error/Error';
import { Loader } from '@components/Loader/Loader';

import { TSignUpSchema, signUpSchema } from '@components/RegistrationForm/RegistrationForm.types';

import styles from '@components/RegistrationForm/RegistrationForm.module.scss';

export function RegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValidating },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const isLoading = useAppSelector(selectStatus);
    const registrationError = useAppSelector(selectErrorMessage);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async ({ name, surname, email, password, confirmPassword }: TSignUpSchema) => {
        await dispatch(signUp({ name, surname, email, password, confirmPassword }));

        if (!registrationError && !isLoading) {
            navigate('/');
        }
        reset();
    };
    return (
        <section className={styles['registration']}>
            <form className={styles['registration__form']} onSubmit={handleSubmit(onSubmit)}>
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
                <Button disabled={isSubmitting || isValidating} fullWidth type="submit">
                    {isLoading ? <Loader /> : 'Zarejestruj się'}
                </Button>
                {registrationError && <ErrorMessage message={registrationError} />}
            </form>
        </section>
    );
}
