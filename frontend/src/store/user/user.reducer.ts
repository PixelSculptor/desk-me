import { UserResponse } from '@/types/UserTypes';
import { TUserState } from './user.action.types';
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
};

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state: TUserState, action: PayloadAction<UserResponse>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
