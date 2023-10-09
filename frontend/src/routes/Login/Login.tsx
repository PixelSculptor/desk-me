import { Link } from 'react-router-dom';

import styles from './Login.module.scss';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export function Login() {
    return (
        <section className={styles['loginPanel']}>
            <h2 className={styles['loginPanel__heading']}>
                Zaloguj się do swojego konta
            </h2>
            <LoginForm />
            <h6 className={styles['loginPanel__redirectionLogin']}>
                Nie masz jeszcze konta?
                <Link to={'/register'}> Zarejestruj&nbsp;się</Link>
            </h6>
        </section>
    );
}
