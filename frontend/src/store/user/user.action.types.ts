import { UserResponse } from '@/types/UserTypes';

export type TUserState = {
    user: UserResponse | null;
    isLoading: boolean;
    error: string;
};

export const USER = 'user';
export type USER = typeof USER;

export const GET_USER_BY_EMAIL = `${USER}/getUserStart`;
export type GET_USER_BY_EMAIL = typeof GET_USER_BY_EMAIL;
