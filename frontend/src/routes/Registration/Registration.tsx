import { Link } from 'react-router-dom';

import { RegistrationForm } from '@components/RegistrationForm/RegistrationForm';

import styles from './Registration.module.scss';

export function Registration() {
    return (
        <section className={styles['registrationPanel']}>
            <h2 className={styles['registrationPanel__heading']}>
                Stwórz swoje konto już dzisiaj
            </h2>
            <RegistrationForm />
            <h6 className={styles['registrationPanel__redirectLogin']}>
                Masz już konto? <Link to={'/login'}>Zaloguj się</Link>
            </h6>
        </section>
    );
}
