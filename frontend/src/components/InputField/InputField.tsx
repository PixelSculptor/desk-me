import React, { ChangeEvent, ComponentPropsWithRef } from 'react';
import { InputTypes } from '../../types/InputTypes';

type InputFieldProps = {
    label: string;
    type?: InputTypes;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithRef<'input'>;

function InputField({
    label,
    id,
    type = 'text',
    placeholder,
    required,
    onChange,
}: InputFieldProps) {
    return (
        <div className="inputField">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputField;
