import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Registration } from '@/views/Registration/Registration';
import { ROUTES } from './types/Routes';
import { Login } from '@/views/Login/Login';
import { ProtectedRoute } from './views/routes/guards/ProtectedRoute';
import { Home } from './views/Home/Home';

function App() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
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
            </Routes>
        </AnimatePresence>
    );
}

export default App;
