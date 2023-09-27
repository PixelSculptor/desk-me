import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Registration from './routes/Registration/Registration';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </>
    );
}

export default App;
