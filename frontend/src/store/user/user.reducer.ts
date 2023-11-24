import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserResponse } from '@/types/UserTypes';
import { TUserState, USER } from './user.action.types';
import { logIn } from './user.thunk';

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
        builder.addCase(logIn.pending, (state: TUserState) => {
            state.isLoading = true;
        });
        builder.addCase(logIn.fulfilled, (state: TUserState, { payload }: PayloadAction<UserResponse>) => {
            state.user = payload;
            state.isLoading = false;
        });
        builder.addCase(logIn.rejected, (state, action) => {
            if (action.payload) {
                state.error = `${action.payload}`;
            }
            state.error = action.error as string;
        });
    },
});

export const userReducer = userSlice.reducer;
