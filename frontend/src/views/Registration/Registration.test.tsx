import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { TSignUpSchema } from '@/components/RegistrationForm/RegistrationForm.types';
import { store } from '@store/store';
import { Registration } from './Registration';

const MockRegistration = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Registration />
            </BrowserRouter>
        </Provider>
    );
};

const CORRECT_USER: TSignUpSchema = {
    name: 'John',
    surname: 'Doe',
    email: 'xyz@gmail.com',
    password: 'P@ssw0rd1!',
    confirmPassword: 'P@ssw0rd1!',
};

describe('Registration Panel Tests', () => {
    it('Should render header for inviting user to create acocunt and footer to with redirect link to login page', () => {
        render(<MockRegistration />);

        const header = screen.getByText(/Stwórz swoje konto już dzisiaj/i);
        const inviteToLoginHeader = screen.getByText(/Masz już konto?/);
        expect(header).toBeInTheDocument();
        expect(inviteToLoginHeader).toBeInTheDocument();
    });
    it("Should navigate to login panel when user clicks to router link with phrase 'Masz już konto? Zaloguj się'", async () => {
        render(<MockRegistration />);
        const redirectLink = screen.getByText(/Zaloguj się/i);
        fireEvent.click(redirectLink);
        await waitFor(() => {
            expect(window.location.pathname).toBe('/login');
        });
    });
    it('Should move to dashboard view after proper credentials during registration without any error messages below register form inputs', async () => {
        render(<MockRegistration />);

        const name = screen.getByPlaceholderText('Adam');
        const surname = screen.getByPlaceholderText('Kowalski');
        const email = screen.getByPlaceholderText('adam.kowalski@gmail.com');
        const password = screen.getByLabelText('Hasło');
        const confirmPassword = screen.getByLabelText('Powtórz hasło');
        const submit = screen.getByRole('button');
        expect(submit).toHaveTextContent(/Zarejestruj się/i);

        userEvent.type(name, CORRECT_USER.name);
        userEvent.type(surname, CORRECT_USER.surname);
        userEvent.type(email, CORRECT_USER.email);
        userEvent.type(password, CORRECT_USER.password);
        userEvent.type(confirmPassword, CORRECT_USER.confirmPassword);
        await userEvent.click(submit);

        await waitFor(() => {
            const heading = screen.findByRole('heading', { level: 2 });
            expect(window.location.pathname).toBe('/');
            expect(heading).toHaveTextContent('Witaj');
        });
    });
});
