import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <Link to="/register">Zarejestruj się</Link>
                </li>
                <li>
                    <Link to="/login">Zaloguj się</Link>
                </li>
                <li>
                    <Link to="myreservations">Moje rezerwacje</Link>
                </li>
            </ul>
        </nav>
    );
}
