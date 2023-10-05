import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { RegistrationForm } from './RegistrationForm';

const MockRegisterForm = () => {
    return (
        <BrowserRouter>
            <RegistrationForm />
        </BrowserRouter>
    );
};

describe('Unit tests for Registration Form Component', () => {
    it('Renders all inputs properly', () => {
        render(<MockRegisterForm />);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('All inputs fires onfocus event', () => {
        render(<MockRegisterForm />);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            fireEvent.change(input, { target: { value: 'lorem ipsum' } });
            expect((input as HTMLInputElement).value).toBe('lorem ipsum');
        });
    });

    it('Inputs after filled properly should be empty', () => {
        render(<MockRegisterForm />);

        const name = screen.getByPlaceholderText('Adam');
        const surname = screen.getByPlaceholderText('Kowalski');
        const email = screen.getByPlaceholderText('adam.kowalski@gmail.com');
        const passwordInputs = screen.getAllByPlaceholderText('********');
        const signUpButton = screen.getByRole('button');

        userEvent.type(name, 'Adam');
        userEvent.type(surname, 'Kowalski');
        userEvent.type(email, 'adam.kowalski@gmail.com');
        passwordInputs.forEach((inputPassword) => {
            userEvent.type(inputPassword, 'P@ssword1!');
        });

        userEvent.click(signUpButton);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            expect(input).toHaveTextContent('');
        });
    });
    it('should render communicate when passwords are not same', async () => {
        const { getByTestId, getByRole, queryByTestId } = render(
            <MockRegisterForm />
        );
        const name = getByTestId('name');
        const surname = getByTestId('surname');
        const email = getByTestId('email');
        const password = getByTestId('password');
        const confirmPassword = getByTestId('confirmPassword');

        userEvent.type(name, 'Adam');
        userEvent.type(name, 'Adam');
        userEvent.type(surname, 'Kowalski');
        userEvent.type(email, 'adam.kowalski@gmail.com');
        userEvent.type(password, 'P@ssword1!');
        userEvent.type(confirmPassword, 'P@ssword11');

        userEvent.click(getByRole('button'));
        const error = await queryByTestId('errorMessage');

        expect(error).toBeInTheDocument();
    });
});
