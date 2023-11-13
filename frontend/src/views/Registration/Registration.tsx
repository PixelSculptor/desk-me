import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { RegistrationForm } from '@components/RegistrationForm/RegistrationForm';

import styles from './Registration.module.scss';

export function Registration() {
    return (
        <motion.section
            className={styles['registrationPanel']}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <h2 className={styles['registrationPanel__heading']}>Stwórz swoje konto już dzisiaj</h2>
            <RegistrationForm />
            <h6 className={styles['registrationPanel__redirectLogin']}>
                Masz już konto? <Link to={'/login'}>Zaloguj się</Link>
            </h6>
        </motion.section>
    );
}
