import { screen, render, fireEvent } from '@testing-library/react';
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

    it('Inputs after filled properly should be empty', () => {
        render(<MockLoginForm />);
        const email = screen.getByPlaceholderText('adam.kowalski@gmail.com');
        const password = screen.getByPlaceholderText('********');
        const loginButton = screen.getByRole('button');

        userEvent.type(email, 'joe-doe@gmail.com');
        userEvent.type(password, 'P@ssw0rd1!');
        userEvent.click(loginButton);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            expect(input).toHaveValue('');
        });
    });
});
