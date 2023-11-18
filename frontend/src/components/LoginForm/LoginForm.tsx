import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { TSignInSchema, signInSchema } from '@components/LoginForm/LoginForm.types';

import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import { ErrorMessage } from '../Error/Error';
import { Loader } from '../Loader/Loader';

import styles from './LoginForm.module.scss';
import { selectErrorMessage, selectStatus } from '@/store/user/user.selector';
// import { logIn } from '@/store/user/user.thunk';
import { useAppDispatch } from '@/store/store';
import { getUserStart } from '@/store/user/user.reducer';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const loginError = useSelector(selectErrorMessage);
    const isLoading = useSelector(selectStatus);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = ({ email, password }: TSignInSchema) => {
        // TODO: delete this old dispatch using redux saga
        dispatch(getUserStart({ email, password }));
        // new dispatch action with Redux-thunk
        // dispatch(logIn({email, password}));
        if (!loginError) {
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
