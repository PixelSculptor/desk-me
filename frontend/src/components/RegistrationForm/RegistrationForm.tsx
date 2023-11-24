// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';

// import { registerUserStart } from '@/store/user/user.reducer';
import { selectErrorMessage, selectStatus } from '@/store/user/user.selector';

import { InputField } from '@components/InputField/InputField';
import { Button } from '@components/Button/Button';
import { ErrorMessage } from '@components/Error/Error';
import { Loader } from '@components/Loader/Loader';

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

    const isLoading = useSelector(selectStatus);
    const registrationError = useSelector(selectErrorMessage);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const onSubmit = async () =>
        // { name, surname, email, password, confirmPassword }: TSignUpSchema
        {
            // dispatch(
            //     registerUserStart({
            //         email,
            //         name,
            //         surname,
            //         password,
            //         confirmPassword,
            //     })
            // );
            // if (!registrationError) {
            //     navigate('/');
            // }
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
