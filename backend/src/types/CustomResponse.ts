import { Response } from 'express';
import { HttpClientStatusErrorCodes, CustomError } from '../utils/CustomError';

type HttpSuccessStatusCodes = 200 | 201 | 202 | 204;

type CustomPayload<T> = {
    code: HttpSuccessStatusCodes;
    body: T;
};
export interface CustomResponse<T> extends Response {
    // eslint-disable-next-line
    status: (
        status: HttpSuccessStatusCodes | HttpClientStatusErrorCodes
    ) => this;
    // eslint-disable-next-line
    send: (
        body: CustomPayload<T> | CustomError<HttpClientStatusErrorCodes>
    ) => this;
}
