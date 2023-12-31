import { ErrorProps } from './Error.types';

import styles from './Error.module.scss';

export function ErrorMessage({ message }: ErrorProps) {
    return (
        <h6 data-testid="errorMessage" className={styles['errorMessage']}>
            {message}
        </h6>
    );
}
