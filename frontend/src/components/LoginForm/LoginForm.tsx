import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import type {} from 'redux-thunk/extend-redux';

import { selectErrorMessage, selectStatus } from '@/store/user/user.selector';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logIn } from '@/store/user/user.thunk';

import { InputField } from '@components/InputField/InputField';
import { Button } from '@components/Button/Button';
import { ErrorMessage } from '@components/Error/Error';
import { Loader } from '@components/Loader/Loader';

import { TSignInSchema, signInSchema } from '@components/LoginForm/LoginForm.types';

import styles from './LoginForm.module.scss';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const loginError = useAppSelector(selectErrorMessage);
    const isLoading = useAppSelector(selectStatus);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async ({ email, password }: TSignInSchema) => {
        await dispatch(logIn({ email, password }));
        if (!loginError && !isLoading) {
            navigate('/');
        }
        reset();
    };

    return (
        <section className={styles['login']}>
            <form className={styles['login__form']} onSubmit={handleSubmit(onSubmit)}>
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

                <Button disabled={isLoading} fullWidth type="submit">
                    {isLoading ? <Loader /> : 'Zaloguj się'}
                </Button>
                {loginError && <ErrorMessage message={loginError} />}
            </form>
        </section>
    );
}
