import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean) => {
    const [value, setValue] = useState(defaultValue);

    const toggleFlag = useCallback(() => {
        setValue((currentValue) => {
            return !currentValue;
        });
    }, [value]);
    return { value, toggleFlag };
};
