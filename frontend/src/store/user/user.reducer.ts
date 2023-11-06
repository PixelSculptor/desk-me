import { UserCredentialTypes, UserResponse } from '@/types/UserTypes';
import { TUserState, USER } from './user.action.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
                payload: { email, password },
            }: PayloadAction<Pick<UserCredentialTypes, 'email' | 'password'>>
        ) => {
            console.log(email, password);
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
    },
});

export const { getUserStart, getUserSuccess, getUserFailure } =
    userSlice.actions;
export const userReducer = userSlice.reducer;
