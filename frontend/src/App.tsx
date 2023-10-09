import { Routes, Route } from 'react-router-dom';
import { Home } from '@routes/Home/Home';
import { Registration } from '@routes/Registration/Registration';
import { ROUTES } from './types/Routes';
import { Login } from './routes/Login/Login';

function App() {
    return (
        <>
            <Routes>
                <Route path={ROUTES.Home} element={<Home />} />
                <Route path={ROUTES.Register} element={<Registration />} />
                <Route path={ROUTES.Login} element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
