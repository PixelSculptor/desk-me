import { ComponentPropsWithRef } from 'react';
import { InputTypes } from '../../types/InputTypes';
import { FieldValues, FieldError, UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form';

export type InputFieldProps<T extends FieldValues> = {
    label: string;
    type?: InputTypes;
    id: Path<T>;
    error: FieldError | undefined;
    register: UseFormRegister<T>;
} & ComponentPropsWithRef<'input'>;
