import { render, screen } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

import { ROUTES } from '@/types/Routes';
import { ProtectedRoute } from '../routes/guards/ProtectedRoute';
import { Home } from '@views/Home/Home';
import { Registration } from '@views/Registration/Registration';
import { Login } from '@views/Login/Login';
import { NotFound } from '@views/NotFound/NotFound';

describe('Routing tests', () => {
    test('test redirect', async () => {
        const nonExistingPage = '/badPath';
        render(
            <MemoryRouter initialEntries={[nonExistingPage]}>
                <Routes>
                    <Route
                        path={ROUTES.Home}
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={ROUTES.Register} element={<Registration />} />
                    <Route path={ROUTES.Login} element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Nie znaleziono strony')).toBeDefined();
    });
});
