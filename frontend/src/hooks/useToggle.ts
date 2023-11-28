import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean) => {
    const [value, setValue] = useState(defaultValue);

    const toggleFlag = useCallback(
        (userValue?: unknown) => {
            setValue((currentValue) => {
                return typeof userValue === 'boolean' ? userValue : !currentValue;
            });
        },
        [value]
    );
    return { value, toggleFlag };
};
