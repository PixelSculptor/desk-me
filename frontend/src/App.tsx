import { Routes, Route } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import { Registration } from './routes/Registration/Registration';
import { ROUTES } from './main';

function App() {
    return (
        <>
            <Routes>
                <Route path={ROUTES.Home} element={<Home />} />
                <Route path={ROUTES.Register} element={<Registration />} />
            </Routes>
        </>
    );
}

export default App;
