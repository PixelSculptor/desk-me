import React from 'react';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';

function Registration() {
    return (
        <section className="registrationPanel">
            <h2 className="registrationPanel__heading">
                Stwórz swoje konto już dzisiaj
            </h2>
            <RegistrationForm />
            <h6 className="registrationPanel__redirectLogin">
                Masz już konto? <Link to={'/login'}>Zaloguj się</Link>
            </h6>
        </section>
    );
}

export default Registration;
