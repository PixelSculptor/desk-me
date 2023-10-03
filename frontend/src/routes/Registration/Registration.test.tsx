import { BrowserRouter } from 'react-router-dom';
import { Registration } from './Registration';
import { render, screen } from '@testing-library/react';

const MockRegistration = () => {
    return (
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );
};

describe('Registration Panel Tests', () => {
    it('Should render header for inviting user to create acocunt', () => {
        render(<MockRegistration />);

        const header = screen.getByText(/Stwórz swoje konto już dzisiaj/i);
        const inviteToLoginHeader = screen.getByText(/Masz już konto?/);
        expect(header).toBeInTheDocument();
        expect(inviteToLoginHeader).toBeInTheDocument();
    });
});
