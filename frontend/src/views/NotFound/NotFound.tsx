import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

function NotFound() {
    return (
        <div className={styles['notFoundView']}>
            <h2 className={styles['notFoundView__headerAlert']}>Nie znaleziono strony</h2>
            <h3 className={styles['notFoundView__errorCode']}>Kod błędu: 404</h3>
            <Link className={styles['notFoundView__fallbackLink']} to="/">
                Wróć do strony domowej
            </Link>
        </div>
    );
}

export default NotFound;
