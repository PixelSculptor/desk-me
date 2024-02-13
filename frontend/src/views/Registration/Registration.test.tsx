import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { TSignUpSchema } from '@/components/RegistrationForm/RegistrationForm.types';
import { store } from '@store/store';
import App from '@/App';

const MockRegistration = () => {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/register']}>
                <App />
            </MemoryRouter>
        </Provider>
    );
};

const CORRECT_USER: TSignUpSchema = {
    name: 'John',
    surname: 'Doe',
    email: 'joe-doe@gmail.com',
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

        waitFor(() => {
            const heading = screen.findByRole('heading', { level: 2 });
            expect(heading).toHaveTextContent('Zaloguj się do swojego konta');
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

        userEvent.type(name, CORRECT_USER.name);
        userEvent.type(surname, CORRECT_USER.surname);
        userEvent.type(email, CORRECT_USER.email);
        userEvent.type(password, CORRECT_USER.password);
        userEvent.type(confirmPassword, CORRECT_USER.confirmPassword);

        fireEvent.click(submit);

        waitFor(() => {
            expect(window.location.pathname).toBe('/');
            const heading = screen.findByRole('heading', { level: 2 });
            expect(heading).toHaveTextContent('Witaj Adam');
        });
    });
});
