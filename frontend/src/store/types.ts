import { TUserState } from './user/user.action.types';

export type TAction<Type, Payload> = {
    type: Type[keyof Type];
    payload: Payload;
};

export type TState = {
    user: TUserState;
};
