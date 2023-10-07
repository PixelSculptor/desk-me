import { createSelector } from 'reselect';

import { TState } from '../types';

const selectUserReducer = (state: TState) => state.user;

export const selectUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.user
);
