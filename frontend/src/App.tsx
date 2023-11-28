import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Registration } from '@/views/Registration/Registration';
import { Login } from '@/views/Login/Login';
import { ProtectedRoute } from '@views/routes/guards/ProtectedRoute';
import { Home } from '@views/Home/Home';

import { Navigation } from '@components/Navigation/Navigation';

import { ROUTES } from './types/Routes';

function App() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route
                    path={ROUTES.Home}
                    element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <Home />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route path={ROUTES.Register} element={<Registration />} />
                <Route path={ROUTES.Login} element={<Login />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
