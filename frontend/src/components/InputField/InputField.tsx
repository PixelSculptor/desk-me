import { FieldValues } from 'react-hook-form';
import { InputFieldProps } from './InputField.types';

import styles from './InputField.module.scss';
import classNames from 'classnames';

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
        <div className={classNames(styles['inputField'])}>
            <label className={styles['inputField__label']} htmlFor={id}>
                {label}
            </label>
            <input
                className={styles['inputField__input']}
                type={type}
                {...register(id)}
                required={required}
                placeholder={placeholder}
            />
            {error && (
                <h6 className={styles['inputField__errorMessage']}>
                    {error.message}
                </h6>
            )}
        </div>
    );
}
