import { Response } from 'express';
import { HttpClientStatusErrorCodes, CustomError } from './CustomError';

type HttpSuccessStatusCodes = 200 | 201 | 202 | 204;

type CustomPayload<T> = {
    [K in keyof T]: T[K];
};

export interface CustomResponse<T> extends Response {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    status: (
        status: HttpSuccessStatusCodes | HttpClientStatusErrorCodes
    ) => this;
    /* eslint-disable @typescript-eslint/no-unused-vars */
    send: (
        body: CustomPayload<T> | CustomError<HttpClientStatusErrorCodes>
    ) => this;
}
