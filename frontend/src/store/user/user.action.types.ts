import { UserResponse } from '@/types/UserTypes';

export type TUserState = {
    user: UserResponse;
    isLoading: boolean;
    error: string;
};

export const USER = 'user';
export type USER = typeof USER;

export const USER_ACTION_TYPES = {
    SIGN_IN: 'user/getUserStart',
    LOG_IN: 'user/logIn',
    SIGN_UP: 'user/registerUserStart',
} as const;
