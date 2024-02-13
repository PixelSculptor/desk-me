import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@store/store';

import { LoginForm } from './LoginForm';

const MockLoginForm = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        </Provider>
    );
};

describe('Unit tests for Login Form Component', () => {
    it('Renders all inputs properly', () => {
        render(<MockLoginForm />);
        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('All inputs fires onfocus event', () => {
        render(<MockLoginForm />);
        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            fireEvent.change(input, {
                target: {
                    value: 'lorem ipsum',
                },
            });
            expect((input as HTMLInputElement).value).toBe('lorem ipsum');
        });
    });

    it('Inputs after filled properly should be empty', async () => {
        render(<MockLoginForm />);
        const email = screen.getByPlaceholderText('adam.kowalski@gmail.com');
        const password = screen.getByPlaceholderText('********');
        const loginButton = screen.getByRole('button');

        await userEvent.type(email, 'joe-doe@gmail.com');
        await userEvent.type(password, 'P@ssw0rd1!');
        await userEvent.click(loginButton);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            expect(input).toHaveValue('');
        });
    });

    it('Should display error message when user type wrong format email', async () => {
        render(<MockLoginForm />);
        const email = screen.getByPlaceholderText('adam.kowalski@gmail.com');
        const password = screen.getByPlaceholderText('********');

        await userEvent.type(email, 'joe-doe.com');
        await userEvent.type(password, 'P@ssw0rd1!');

        const loginButton = screen.getByRole('button');

        await userEvent.click(loginButton);

        waitFor(async () => {
            const errorMessage = await screen.findByText('Niepoprawny format adresu e-mail');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
