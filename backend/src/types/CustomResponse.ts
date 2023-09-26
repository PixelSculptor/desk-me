import { Response } from 'express';

export interface CustomResponse<T, K> extends Response {
    response: T | CustomEvent<K>;
}
