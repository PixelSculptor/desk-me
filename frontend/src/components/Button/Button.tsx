import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { Size } from '../../types/StyleTypes';

type ButtonProps = {
    size?: Size;
    children: ReactNode;
} & ComponentPropsWithRef<'button'>;

function Button({ size = 'medium', children, type }: ButtonProps) {
    return (
        <button className={size} type={type}>
            {children}
        </button>
    );
}

export default Button;
