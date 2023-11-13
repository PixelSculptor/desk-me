import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from './Login.module.scss';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export function Login() {
    return (
        <motion.section
            className={styles['loginPanel']}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <h2 className={styles['loginPanel__heading']}>Zaloguj się do swojego konta</h2>
            <LoginForm />
            <h6 className={styles['loginPanel__redirectionLogin']}>
                Nie masz jeszcze konta?
                <Link to={'/register'}> Zarejestruj&nbsp;się</Link>
            </h6>
        </motion.section>
    );
}
