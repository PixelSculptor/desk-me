import { ComponentPropsWithRef, ReactNode } from 'react';
import { Size } from '../../types/StyleTypes';

export type ButtonProps = {
    size?: Size;
    rounded?: boolean;
    children: ReactNode;
} & ComponentPropsWithRef<'button'>;
