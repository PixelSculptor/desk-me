import React from 'react';
import { ButtonProps } from './Button.types';

export function Button({ size = 'medium', children, type }: ButtonProps) {
    return (
        <button className={size} type={type}>
            {children}
        </button>
    );
}
