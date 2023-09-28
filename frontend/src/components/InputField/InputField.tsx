import { FieldValues } from 'react-hook-form';
import { InputFieldProps } from './InputField.types';

export function InputField<T extends FieldValues>({
    label,
    id,
    type = 'text',
    placeholder,
    required,
    error,
    register,
}: InputFieldProps<T>) {
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
