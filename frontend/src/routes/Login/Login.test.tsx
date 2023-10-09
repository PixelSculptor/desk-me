import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Login } from './Login';
import { render } from '@testing-library/react';

const MockLoginPanel = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
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
    it('Should redirect to /register route when user clicks on router link', async () => {
        const history = createMemoryHistory();
        render(<MockLoginPanel />);
        const linkElement = screen.getByText('Zarejestruj się');
        expect(linkElement).toBeInTheDocument();

        await fireEvent.click(linkElement);
        expect(history.location.pathname).toBe('/register');
    });
});
