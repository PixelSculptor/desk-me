import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';
import classNames from 'classnames';

export function Button({
    size = 'medium',
    children,
    type,
    rounded = true,
    fullWidth = false,
    disabled,
}: ButtonProps) {
    const roundedButton = rounded ? '--rounded' : '';
    const fullWidthButton = fullWidth ? '--fullWidth' : '';
    return (
        <button
            className={classNames(
                styles[`button-cmp`],
                styles[size],
                styles[roundedButton],
                styles[fullWidthButton]
            )}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
