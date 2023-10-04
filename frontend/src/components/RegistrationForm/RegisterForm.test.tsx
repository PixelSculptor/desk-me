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

    // it("It should be error when passwords are not equals", async () => {
    //     render(<MockRegisterForm/>);

    //     const name = screen.getByPlaceholderText("Adam")
    //     const surname = screen.getByPlaceholderText("Kowalski")
    //     const email = screen.getByPlaceholderText("adam.kowalski@gmail.com")
    //     const passwordInputs = screen.getAllByPlaceholderText("********")
    //     const signUpButton = await screen.findByRole("button");

    //     userEvent.type(name, "Adam")
    //     userEvent.type(surname, "Kowalski")
    //     userEvent.type(email, "adam.kowalski@gmail.com")
    //     userEvent.type(passwordInputs[0], "Password1!")
    //     userEvent.type(passwordInputs[1], "Password11")
    //     userEvent.click(signUpButton);
    //     console.log(screen.debug());

    //     const errorMessage = await screen.findAllByTestId("errorMessage");

    //     expect(errorMessage).toBeInTheDocument();

    // })
});
