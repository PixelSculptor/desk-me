import { ChangeEvent, ComponentPropsWithRef } from 'react';
import { InputTypes } from '../../types/InputTypes';

export type InputFieldProps = {
    label: string;
    type?: InputTypes;
    error?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithRef<'input'>;
