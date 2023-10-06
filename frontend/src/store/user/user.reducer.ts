import { UserResponse } from '@/types/UserTypes';
import { TUserState } from './user.action.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: TUserState = {
    user: {
        email: '',
        id: '',
        name: '',
        surname: '',
        token: '',
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
