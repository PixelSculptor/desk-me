import { UserCredentialTypes, UserResponse } from '@/types/UserTypes';
import { TUserState, USER } from './user.action.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSignUpSchema } from '@/components/RegistrationForm/RegistrationForm.types';

const INITIAL_STATE: TUserState = {
    user: {
        id: '',
        email: '',
        name: '',
        surname: '',
        accessToken: '',
        refreshToken: '',
    },
    isLoading: false,
    error: '',
};

const userSlice = createSlice({
    name: USER,
    initialState: INITIAL_STATE,
    reducers: {
        getUserStart: (
            state: TUserState,
            {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                payload: payload,
            }: PayloadAction<Pick<UserCredentialTypes, 'email' | 'password'>>
        ) => {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        },
        getUserSuccess: (
            state: TUserState,
            { payload }: PayloadAction<UserResponse>
        ) => {
            return {
                ...state,
                user: payload,
                isLoading: false,
                error: '',
            };
        },
        getUserFailure: (
            state: TUserState,
            { payload }: PayloadAction<string>
        ) => {
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        },
        registerUserStart: (
            state: TUserState,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            payload: PayloadAction<TSignUpSchema>
        ) => {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        },
        registerUserSuccess: (
            state: TUserState,
            { payload }: PayloadAction<UserResponse>
        ) => {
            return {
                ...state,
                isLoading: false,
                user: payload,
                error: '',
            };
        },
        registerUserFailure: (state, { payload }: PayloadAction<string>) => {
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        },
    },
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    registerUserStart,
    registerUserSuccess,
    registerUserFailure,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
