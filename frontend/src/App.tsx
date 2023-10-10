import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Home } from '@routes/Home/Home';
import { Registration } from '@routes/Registration/Registration';
import { ROUTES } from './types/Routes';
import { Login } from './routes/Login/Login';

function App() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path={ROUTES.Home} element={<Home />} />
                <Route path={ROUTES.Register} element={<Registration />} />
                <Route path={ROUTES.Login} element={<Login />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
