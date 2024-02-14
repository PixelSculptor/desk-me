import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { Home } from '@/views/Home/Home';

import { userReducer } from '@/store/user/user.reducer';

import { MOCK_USER } from '@/mocks/mockData';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: {
        user: {
            user: {
                ...MOCK_USER,
            },
            isLoading: false,
            error: '',
        },
    },
});

const HomeMockView = () => {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
};

describe('Unit tests for Home view', () => {
    it('Should render Home view with greetings.', () => {
        render(<HomeMockView />);
        const greetings = screen.getByRole('heading', { level: 2 });
        expect(greetings).toHaveTextContent(new RegExp(`^Witaj ${MOCK_USER.name}$`));
    });
});
