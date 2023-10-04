import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from './InputField';
import {
    TSignUpSchema,
    signUpSchema,
} from '@components/RegistrationForm/RegisterForm.types';

const MockInputComponent = () => {
    const {
        register,
        formState: { errors },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    return (
        <InputField
            id="email"
            type="email"
            label="E-mail"
            register={register}
            required
            placeholder="adam.kowalski@gmail.com"
            error={errors.email}
        />
    );
};

describe('InputField component tests', () => {
    it('should render label with input text name', async () => {
        render(<MockInputComponent />);

        const label = await screen.findByLabelText(/e-mail/i);
        expect(label).toBeInTheDocument();
        expect(label).toBeVisible();
    });

    it('should render Input Field with proper email placeholder', async () => {
        render(<MockInputComponent />);

        const input = await screen.findByPlaceholderText(/^.+@.+\..+$/i);

        expect(input).toHaveAttribute('placeholder', 'adam.kowalski@gmail.com');
    });

    it('should render input with required flag and type email', async () => {
        render(<MockInputComponent />);

        const input = await screen.getByPlaceholderText(
            /adam.kowalski@gmail.com/i
        );

        const inputType = input.getAttribute('type');

        expect(input).toBeRequired();
        expect(inputType).toBe('email');
    });

    it('check if for attribute is equal input element', () => {
        render(<MockInputComponent />);

        const htmlFor = screen.getByText('E-mail').getAttribute('for');
        const inputId = screen
            .getByPlaceholderText('adam.kowalski@gmail.com')
            .getAttribute('id');

        expect(htmlFor).toBe(inputId);
    });
});
