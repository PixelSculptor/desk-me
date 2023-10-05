import { FieldValues } from 'react-hook-form';
import { InputFieldProps } from './InputField.types';

import styles from './InputField.module.scss';
import classNames from 'classnames';
import { ErrorMessage } from '../Error/Error';

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
                data-testid={id}
                {...register(id)}
                id={id}
                required={required}
                placeholder={placeholder}
            />
            {error && error.message && <ErrorMessage message={error.message} />}
        </div>
    );
}
