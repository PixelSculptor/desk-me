import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';
import classNames from 'classnames';

export function Button({
    size = 'medium',
    children,
    type,
    rounded = true,
    disabled,
}: ButtonProps) {
    const roundedButton = rounded ? '--rounded' : '';
    return (
        <button
            className={classNames(
                styles[`button-cmp`],
                styles[size],
                styles[roundedButton]
            )}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
