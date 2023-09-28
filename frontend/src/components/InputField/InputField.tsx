import React from 'react';

import { InputFieldProps } from './InputField.types';

export function InputField({
    label,
    id,
    type = 'text',
    placeholder,
    required,
    error,
    register,
}: InputFieldProps<typeof register>) {
    return (
        <div className="inputField">
            <label className="inputField__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="inputField__input"
                type={type}
                {...register(id)}
                required={required}
                placeholder={placeholder}
            />
            {error && (
                <h6 className="inputField__errorMessage">{error.message}</h6>
            )}
        </div>
    );
}
