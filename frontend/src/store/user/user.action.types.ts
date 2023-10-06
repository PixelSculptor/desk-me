import { TAction } from '../types';
import { UserResponse } from '@/types/UserTypes';

export const ACTION_TYPES = {
    SET_CURRENT_USER: 'user/SET_CURRENT_USER',
    GET_CURRENT_USER: 'user/GET_CURRENT_USER',
} as const;

export type TUserAction = TAction<typeof ACTION_TYPES, UserResponse>;

export type TUserInitialState = {
    user: UserResponse;
};
