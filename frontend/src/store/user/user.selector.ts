import { createSelector } from 'reselect';

import { TState } from '../types';

const selectUserReducer = (state: TState) => state.user;

export const selectUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.user
);

export const selectStatus = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.isLoading
);

export const selectErrorMessage = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.error
);
