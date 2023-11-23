import { combineReducers } from '@reduxjs/toolkit';
// import { userReducer } from './user/user.reducer';
import { user_Reducer as userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
});
