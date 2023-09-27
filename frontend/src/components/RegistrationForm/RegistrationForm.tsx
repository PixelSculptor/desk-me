import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { UseSignUp } from '../../hooks/useSignUp';
import { UserCredentialTypes } from '../../types/UserTypes';

const accountFields: UserCredentialTypes = {
    email: '',
    password: '',
    name: '',
    surname: '',
};

function RegistrationForm() {
    const [inputFields, setInputFields] =
        useState<UserCredentialTypes>(accountFields);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const navigate = useNavigate();
    const [isSigning, setIsSignup] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name: fieldName, value: fieldValue } = event.target;
        console.log(`Fieldname: ${fieldName} FieldValue: ${fieldValue}`);
        setInputFields({ ...inputFields, [fieldName]: fieldValue });
    };

    const handleSignUp = async () => {
        const user = await UseSignUp({ ...inputFields });
    };

    return (
        <section className="registration">
            <form className="registration__form" onSubmit={handleSignUp}>
                <InputField
                    id="name"
                    label="Imię"
                    required
                    placeholder="Adam"
                    onChange={handleChange}
                />
                <InputField
                    id="surname"
                    label="Nazwisko"
                    required
                    placeholder="Kowalski"
                    onChange={handleChange}
                />
                <InputField
                    id="email"
                    label="Adres E-Mail"
                    required
                    type="email"
                    placeholder="adam.kowalski@gmail.com"
                    onChange={handleChange}
                />
                <InputField
                    id="password"
                    label="Hasło"
                    required
                    type="password"
                    placeholder="********"
                    onChange={handleChange}
                />
                <InputField
                    id="repeatPassword"
                    label="Powtórz hasło"
                    required
                    type="password"
                    placeholder="********"
                    onChange={handleChange}
                />
                <Button type="submit">Zarejestruj się</Button>
            </form>
        </section>
    );
}

export default RegistrationForm;
