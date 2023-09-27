import { ComponentPropsWithRef, ReactNode } from 'react';
import { Size } from '../../types/StyleTypes';

export type ButtonProps = {
    size?: Size;
    children: ReactNode;
} & ComponentPropsWithRef<'button'>;
