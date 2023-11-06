import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest, call } from 'redux-saga/effects';
// import { useNavigate } from "react-router-dom";

import { UserCredentialTypes } from '@/types/UserTypes';
import { GET_USER_BY_EMAIL } from './user.action.types';
import { getUserFailure, getUserSuccess } from './user.reducer';
import { isUserResponse } from '@/types/guards/isUserResponse';
import { isClientError } from '@/types/guards/isClientError';

// login API request
function* getUserByEmail({
    payload: { email, password },
}: PayloadAction<Pick<UserCredentialTypes, 'email' | 'password'>>) {
    // const navigate = useNavigate();
    try {
        console.log('saga user');
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
            // dispatch(getUserSuccess(responseData));
            // navigate('/');
        } else if (!response.ok && isClientError(responseData)) {
            const { cause, code } = responseData;
            const errorMessage = `${cause} Kod błędu: ${code}`;
            throw new Error(errorMessage);
            // setLoginError(`${cause} Kod błędu: ${code}`);
        } else {
            throw new Error('Coś poszło nie tak');
            // setLoginError('Coś poszło nie tak');
        }
    } catch (e: unknown) {
        if (e instanceof Error) yield put(getUserFailure(e.message));
    }
}

export default function* userSaga() {
    console.log('run');
    yield takeLatest(GET_USER_BY_EMAIL, getUserByEmail);
}
