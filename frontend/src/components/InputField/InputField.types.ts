import { ChangeEvent, ComponentPropsWithRef } from 'react';
import { InputTypes } from '../../types/InputTypes';
import { FieldError } from 'react-hook-form';

export type InputFieldProps = {
    label: string;
    type?: InputTypes;
    error?: FieldError;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithRef<'input'>;
