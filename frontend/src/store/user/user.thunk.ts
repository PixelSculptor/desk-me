import { createAsyncThunk } from '@reduxjs/toolkit';

import { USER_ACTION_TYPES } from './user.action.types';
import { isUserResponse } from '@/types/guards/isUserResponse';
import { isClientError } from '@/types/guards/isClientError';

export const logIn = createAsyncThunk(
    USER_ACTION_TYPES.LOG_IN,
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response: Response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData: unknown = await response.json();
            if (response.ok && isUserResponse(responseData)) {
                return responseData;
            } else if (!response.ok && isClientError(responseData)) {
                const { cause, code } = responseData;
                const errorMessage = `${cause} Kod błędu: ${code}`;
                throw new Error(errorMessage);
            } else {
                throw new Error('Coś poszło nie tak');
            }
        } catch (err: unknown) {
            return rejectWithValue(err as string);
        }
    }
);
