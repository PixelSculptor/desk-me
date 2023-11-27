import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserResponse } from '@/types/UserTypes';
import { TUserState, USER } from './user.action.types';
import { logIn, signUp } from './user.thunk';

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
    reducers: {},
    extraReducers: (builder) => {
        // action thunks for logging
        builder.addCase(logIn.pending, (state: TUserState) => {
            state.isLoading = true;
        }),
            builder.addCase(logIn.fulfilled, (state: TUserState, { payload }: PayloadAction<UserResponse>) => {
                state.user = payload;
                state.isLoading = false;
            }),
            builder.addCase(logIn.rejected, (state, action) => {
                if (action.payload) {
                    state.error = `${action.payload}`;
                }
                state.error = action.error as string;
            }),
            // action thunks for registering:
            builder.addCase(signUp.pending, (state: TUserState) => {
                state.isLoading = true;
            }),
            builder.addCase(signUp.fulfilled, (state: TUserState, { payload }: PayloadAction<UserResponse>) => {
                state.isLoading = false;
                state.user = payload;
            }),
            builder.addCase(signUp.rejected, (state: TUserState, action) => {
                const { payload, error } = action;
                if (action.payload) {
                    state.error = payload as string;
                }
                state.error = error as string;
            });
    },
});

export const userReducer = userSlice.reducer;
