import { TUserAction, TUserState } from './user.action.types';

const INITIAL_STATE: TUserState = {
    user: {
        email: '',
        id: '',
        name: '',
        surname: '',
        token: '',
    },
};

export const userReducer = (
    state: TUserState = INITIAL_STATE,
    action: TUserAction
) => {
    switch (action.type) {
        case 'user/SET_CURRENT_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
