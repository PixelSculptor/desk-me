import React, { ChangeEvent, useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';

// import { UseSignUp } from '../../hooks/useSignUp';
import { RegisterFieldsTypes } from './RegisterFieldsTypes';
import { UserCredentialTypes } from '../../types/UserTypes';

const accountFields: RegisterFieldsTypes = {
    email: '',
    password: '',
    name: '',
    surname: '',
    confirmPassword: '',
};

export const RegistrationForm = forwardRef(function RegistrationForm() {
    const [inputFields, setInputFields] =
        useState<UserCredentialTypes>(accountFields);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFieldsTypes>({
        defaultValues: {
            ...accountFields,
        },
    });
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const navigate = useNavigate();
    const [isSigning, setIsSignup] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name: fieldName, value: fieldValue } = event.target;
        console.log(`Fieldname: ${fieldName} FieldValue: ${fieldValue}`);
        setInputFields({ ...inputFields, [fieldName]: fieldValue });
    };

    // const handleSignUp = async () => {
    //     const user = await UseSignUp({ ...inputFields });
    // }

    const onSubmit: SubmitHandler<UserCredentialTypes> = (data) =>
        console.log(data);
    return (
        <section className="registration">
            <form
                className="registration__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    {...register('name', {
                        required: 'To pole jest obowiązkowe',
                    })}
                    ref={null}
                    id="name"
                    label="Imię"
                    placeholder="Adam"
                    error={errors.name}
                    onChange={handleChange}
                />
                <InputField
                    id="surname"
                    {...register('surname', {
                        required: 'To pole jest obowiązkowe',
                    })}
                    label="Nazwisko"
                    placeholder="Kowalski"
                    onChange={handleChange}
                />
                <InputField
                    id="email"
                    {...register('email', {
                        required: 'To pole jest obowiązkowe',
                    })}
                    label="Adres E-Mail"
                    type="email"
                    placeholder="adam.kowalski@gmail.com"
                    onChange={handleChange}
                />
                <InputField
                    id="password"
                    {...register('password', {
                        required: 'To pole jest obowiązkowe',
                    })}
                    label="Hasło"
                    type="password"
                    placeholder="********"
                    onChange={handleChange}
                />
                <InputField
                    id="repeatPassword"
                    {...register('confirmPassword', {
                        required: 'To pole jest obowiązkowe',
                    })}
                    label="Powtórz hasło"
                    type="password"
                    placeholder="********"
                    onChange={handleChange}
                />
                <Button type="submit">Zarejestruj się</Button>
            </form>
        </section>
    );
});
