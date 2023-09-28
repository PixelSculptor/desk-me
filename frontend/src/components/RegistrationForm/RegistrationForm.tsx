import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';

import { RegisterFieldsTypes } from './RegisterFieldsTypes';

const accountFields: RegisterFieldsTypes = {
    email: '',
    password: '',
    name: '',
    surname: '',
    confirmPassword: '',
};

export const RegistrationForm = function RegistrationForm() {
    // const [inputFields, setInputFields] =
    //     useState<UserCredentialTypes>(accountFields);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFieldsTypes>();
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const navigate = useNavigate();
    const [isSigning, setIsSignup] = useState<RegisterFieldsTypes>();

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name: fieldName, value: fieldValue } = event.target;
    //     console.log(`Fieldname: ${fieldName} FieldValue: ${fieldValue}`);
    //     setInputFields({ ...inputFields, [fieldName]: fieldValue });
    // };

    // const handleSignUp = async () => {
    //     const user = await UseSignUp({ ...inputFields });
    // }

    const onSubmit: SubmitHandler<RegisterFieldsTypes> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    };
    return (
        <section className="registration">
            <form
                className="registration__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    id="name"
                    label="Imię"
                    placeholder="Adam"
                    register={register}
                    error={errors.name}
                />
                <InputField
                    id="surname"
                    label="Nazwisko"
                    placeholder="Kowalski"
                    register={register}
                    error={errors.surname}
                />
                <InputField
                    id="email"
                    label="Adres E-Mail"
                    type="email"
                    placeholder="adam.kowalski@gmail.com"
                    register={register}
                    error={errors.email}
                />
                <InputField
                    id="password"
                    label="Hasło"
                    type="password"
                    placeholder="********"
                    register={register}
                    error={errors.password}
                />
                <InputField
                    id="repeatPassword"
                    label="Powtórz hasło"
                    type="password"
                    placeholder="********"
                    register={register}
                    error={errors.confirmPassword}
                />
                <Button disabled={isSubmitting} type="submit">
                    Zarejestruj się
                </Button>
            </form>
        </section>
    );
};
