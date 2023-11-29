import { UserResponse } from '../types/UserTypes';

export const isAuth = (user: UserResponse): boolean => {
    if (
        user.id === '' &&
        user.email === '' &&
        user.name === '' &&
        user.surname === '' &&
        user.accessToken === '' &&
        user.refreshToken === ''
    ) {
        return false;
    }
    return true;
};
