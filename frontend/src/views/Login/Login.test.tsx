import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from '@/App';

import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';

const MockLoginPanel = () => {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        </Provider>
    );
};

const CORRECT_USER = {
    name: 'Adam',
    email: 'xyz@gmail.com',
    password: 'P@ssw0rd1!',
};

describe('Test for Login panel', () => {
    it('Should render properly Login Panel', () => {
        render(<MockLoginPanel />);
        const header = screen.getByRole('heading', { level: 2 });
        const inviteToRegisterHeader = screen.getByRole('heading', {
            level: 6,
        });
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Zaloguj się do swojego konta');
        expect(inviteToRegisterHeader).toBeInTheDocument();
        expect(inviteToRegisterHeader).toHaveTextContent('Nie masz jeszcze konta? Zarejestruj się');
    });
    it("navigates register panel when user clicks to router link with phrase 'Nie masz jeszcze konta? Zarejestruj się'", async () => {
        render(<MockLoginPanel />);
        const redirectLink = screen.getByRole('link');

        fireEvent.click(redirectLink);
        expect(redirectLink).toHaveTextContent('Zarejestruj się');
        expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent('Stwórz swoje konto już dzisiaj');
    });
    it('Should move to dashboard view after proper credentials without any error messages below login form inputs', async () => {
        render(<MockLoginPanel />);
        const email = screen.getByPlaceholderText('adam.kowalski@gmail.com');
        const password = screen.getByPlaceholderText('********');
        const submit = screen.getByRole('button');

        userEvent.type(email, CORRECT_USER.email);
        userEvent.type(password, CORRECT_USER.password);
        fireEvent.click(submit);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });
});
