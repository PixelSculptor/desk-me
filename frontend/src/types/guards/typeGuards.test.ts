import { isClientError } from './isClientError';
import { isUserResponse } from './isUserResponse';

const errorPayloadCorrect: unknown = {
    code: 404,
    cause: 'Wrong path',
    message: 'Not Found',
};

const errorPayloadWrong: unknown = {
    code: 404,
    cause: 'Wrong path',
};

const userResponsePayloadCorrect: unknown = {
    id: 'user ID',
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@op.pl',
    accessToken: 'secret JWT Token',
    refreshToken: 'secret JWT Token',
};

const userResponsePayloadWrong: unknown = {
    id: true,
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@op.pl',
};

describe('Unit tests for Type Guards', () => {
    it('Should be correct Error Payload Object and User Response object', () => {
        const isErrorPayload = isClientError(errorPayloadCorrect);
        const isUserResponsePayload = isUserResponse(
            userResponsePayloadCorrect
        );

        expect(isErrorPayload).toBeTruthy();
        expect(isUserResponsePayload).toBeTruthy();
    });
    it('Object is not proper Error Payload and User response', () => {
        const isErrorPayload = isClientError(errorPayloadWrong);

        const isUserResponsePayload = isUserResponse(userResponsePayloadWrong);

        expect(isErrorPayload).not.toBeTruthy();
        expect(isUserResponsePayload).not.toBeTruthy();
    });
});
