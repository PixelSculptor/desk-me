import React from 'react';

import { InputFieldProps } from './InputField.types';

export function InputField({
    label,
    id,
    type = 'text',
    placeholder,
    required,
    error,
    onChange,
}: InputFieldProps) {
    return (
        <div className="inputField">
            <label className="inputField__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="inputField__input"
                type={type}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
            <h6 className="inputField__errorMessage">{error?.message}</h6>
        </div>
    );
}

export default InputField;
