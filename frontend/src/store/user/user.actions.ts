import { UserResponse } from '@/types/UserTypes';
import { TUserAction } from './user.action.types';

export const setCurrentUser = (user: UserResponse): TUserAction => ({
    type: 'user/SET_CURRENT_USER',
    payload: user,
});
