import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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

describe('Registration Panel Tests', () => {
    it('Should render header for inviting user to create acocunt and footer to with redirect link to login page', () => {
        render(<MockRegistration />);

        const header = screen.getByText(/Stwórz swoje konto już dzisiaj/i);
        const inviteToLoginHeader = screen.getByText(/Masz już konto?/);
        expect(header).toBeInTheDocument();
        expect(inviteToLoginHeader).toBeInTheDocument();
    });
});
