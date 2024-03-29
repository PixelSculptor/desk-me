import { createAsyncThunk } from '@reduxjs/toolkit';

import { USER_ACTION_TYPES } from './user.action.types';
import { isUserResponse } from '@/types/guards/isUserResponse';
import { isClientError } from '@/types/guards/isClientError';
import { UserCredentialTypes } from '@/types/UserTypes';
import { TSignUpSchema } from '@/components/RegistrationForm/RegistrationForm.types';

export const logIn = createAsyncThunk(
    USER_ACTION_TYPES.LOG_IN,
    async ({ email, password }: Pick<UserCredentialTypes, 'email' | 'password'>, { rejectWithValue }) => {
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
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err as string);
        }
    }
);

export const signUp = createAsyncThunk(
    USER_ACTION_TYPES.SIGN_UP,
    async (userCredentialData: TSignUpSchema, { rejectWithValue }) => {
        try {
            const response: Response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify(userCredentialData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
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
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err as string);
        }
    }
);
