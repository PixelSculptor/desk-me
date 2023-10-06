import { TUserAction, TUserInitialState } from './user.action.types';

const INITIAL_STATE: TUserInitialState = {
    user: {
        email: '',
        id: '',
        name: '',
        surname: '',
        token: '',
    },
};

export const userReducer = (
    state: TUserInitialState = INITIAL_STATE,
    action: TUserAction
) => {
    switch (action.type) {
        case 'user/SET_CURRENT_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
