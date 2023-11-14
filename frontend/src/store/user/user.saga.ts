import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest, call, all } from 'redux-saga/effects';

import { UserCredentialTypes } from '@/types/UserTypes';
import { USER_ACTION_TYPES } from './user.action.types';
import { getUserFailure, getUserSuccess, registerUserFailure, registerUserSuccess } from './user.reducer';
import { isUserResponse } from '@/types/guards/isUserResponse';
import { isClientError } from '@/types/guards/isClientError';
import { TSignUpSchema } from '@/components/RegistrationForm/RegistrationForm.types';

// login API request
function* loginUser({ payload: { email, password } }: PayloadAction<Pick<UserCredentialTypes, 'email' | 'password'>>) {
    try {
        const response: Response = yield call(() =>
            fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        );
        const responseData: unknown = yield response.json();

        if (response.ok && isUserResponse(responseData)) {
            yield put(getUserSuccess(responseData));
        } else if (!response.ok && isClientError(responseData)) {
            const { cause, code } = responseData;
            const errorMessage = `${cause} Kod błędu: ${code}`;
            throw new Error(errorMessage);
        } else {
            throw new Error('Coś poszło nie tak');
        }
    } catch (e: unknown) {
        if (e instanceof Error) yield put(getUserFailure(e.message));
    }
}

// register API request
function* registerUser({ payload: { email, name, surname, password, confirmPassword } }: PayloadAction<TSignUpSchema>) {
    try {
        const response: Response = yield call(() =>
            fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    password,
                    confirmPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        );
        const responseData: unknown = yield response.json();
        if (response.ok && isUserResponse(responseData)) {
            yield put(registerUserSuccess(responseData));
        } else if (!response.ok && isClientError(responseData)) {
            const { cause, code } = responseData;
            const errorMessage = `${cause} Kod błędu: ${code}`;
            throw new Error(errorMessage);
        } else {
            throw new Error('Coś poszło nie tak');
        }
    } catch (e: unknown) {
        if (e instanceof Error) yield put(registerUserFailure(e.message));
    }
}

function* onSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN, loginUser);
}

function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP, registerUser);
}

export default function* userSaga() {
    yield all([call(onSignInStart), call(onSignUpStart)]);
}
