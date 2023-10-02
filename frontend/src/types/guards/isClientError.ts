import { CustomError } from '../CustomErrorTypes';
export function isClientError(payload: unknown): payload is CustomError {
    if (
        (payload as CustomError).code !== undefined &&
        (payload as CustomError).cause !== undefined &&
        (payload as CustomError).message !== undefined
    )
        return true;
    return false;
}
