import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from '@/App';

import { store } from '../../store/store';

const MockLoginPanel = () => {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        </Provider>
    );
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
        expect(inviteToRegisterHeader).toHaveTextContent(
            'Nie masz jeszcze konta? Zarejestruj się'
        );
    });
    it("navigates register panel when user clicks to router link with phrase 'Nie masz jeszcze konta? Zarejestruj się'", async () => {
        render(<MockLoginPanel />);
        const redirectLink = screen.getByRole('link');

        fireEvent.click(redirectLink);
        expect(redirectLink).toHaveTextContent('Zarejestruj się');
        expect(
            await screen.findByRole('heading', { level: 2 })
        ).toHaveTextContent('Stwórz swoje konto już dzisiaj');
    });
});
