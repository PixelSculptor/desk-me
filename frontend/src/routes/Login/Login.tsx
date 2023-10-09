import { Link } from 'react-router-dom';

import styles from './Login.module.scss';

export function Login() {
    return (
        <section className={styles['loginPanel']}>
            <h2 className={styles['loginPanel__heading']}>
                Zaloguj się do swojego konta
            </h2>
            <h6 className={styles['loginPanel__redirectionLogin']}>
                Nie masz jeszcze konta?{' '}
                <Link to={'/register'}>Zarejestruj się</Link>
            </h6>
        </section>
    );
}
