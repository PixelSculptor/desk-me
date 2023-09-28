import React from 'react';
import { ButtonProps } from './Button.types';

export function Button({
    size = 'medium',
    children,
    type,
    disabled,
}: ButtonProps) {
    return (
        <button className={size} type={type} disabled={disabled}>
            {children}
        </button>
    );
}
