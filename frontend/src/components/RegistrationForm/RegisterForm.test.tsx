import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/store';

import { RegistrationForm } from './RegistrationForm';

const MockRegisterForm = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <RegistrationForm />
                </BrowserRouter>
            </PersistGate>
        </Provider>
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
        render(<MockRegisterForm />);
        const name = screen.getByLabelText('Imię');
        const surname = screen.getByLabelText('Nazwisko');
        const email = screen.getByLabelText('Adres E-Mail');
        const password = screen.getByLabelText('Hasło');
        const confirmPassword = screen.getByLabelText('Powtórz hasło');

        await userEvent.type(name, 'John');
        await userEvent.type(surname, 'Doe');
        await userEvent.type(email, 'john.doe@gmail.com');
        await userEvent.type(password, 'P@ssword1!');
        await userEvent.type(confirmPassword, 'P@ssword11');

        await userEvent.click(screen.getByRole('button'));
        const error = await screen.findByText('Hasła muszą się zgadzać');
        expect(error).toHaveTextContent('Hasła muszą się zgadzać');
    });

    it('should render error message when password is too short', async () => {
        render(<MockRegisterForm />);
        const name = screen.getByLabelText('Imię');
        const surname = screen.getByLabelText('Nazwisko');
        const email = screen.getByLabelText('Adres E-Mail');
        const password = screen.getByLabelText('Hasło');
        const confirmPassword = screen.getByLabelText('Powtórz hasło');

        await userEvent.type(name, 'John');
        await userEvent.type(surname, 'Doe');
        await userEvent.type(email, 'john.doe@gmail.com');
        await userEvent.type(password, 'Short!');
        await userEvent.type(confirmPassword, 'Short!');

        await userEvent.click(screen.getByRole('button'));
        const error = await screen.findByText(
            'Hasło powinno mieć co najmniej 10 znaków'
        );
        expect(error).toHaveTextContent(
            'Hasło powinno mieć co najmniej 10 znaków'
        );
    });

    it('should render error message when password is too short and confirm password does not match', async () => {
        render(<MockRegisterForm />);
        const name = screen.getByLabelText('Imię');
        const surname = screen.getByLabelText('Nazwisko');
        const email = screen.getByLabelText('Adres E-Mail');
        const password = screen.getByLabelText('Hasło');
        const confirmPassword = screen.getByLabelText('Powtórz hasło');

        await userEvent.type(name, 'John');
        await userEvent.type(surname, 'Doe');
        await userEvent.type(email, 'john.doe@gmail.com');
        await userEvent.type(password, 'Short!');
        await userEvent.type(confirmPassword, 'P@ssword1!');

        await userEvent.click(screen.getByRole('button'));
        const errorShort = await screen.findByText(
            'Hasło powinno mieć co najmniej 10 znaków'
        );
        const errorMatch = await screen.findByText('Hasła muszą się zgadzać');
        expect(errorShort).toHaveTextContent(
            'Hasło powinno mieć co najmniej 10 znaków'
        );
        expect(errorMatch).toHaveTextContent('Hasła muszą się zgadzać');
    });
});
