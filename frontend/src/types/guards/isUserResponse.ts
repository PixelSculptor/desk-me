import { UserResponse } from '../UserTypes';

export function isUserResponse(payload: unknown): payload is UserResponse {
    if (
        (payload as UserResponse).id !== undefined &&
        (payload as UserResponse).name !== undefined &&
        (payload as UserResponse).surname !== undefined &&
        (payload as UserResponse).email !== undefined &&
        (payload as UserResponse).accessToken !== undefined &&
        (payload as UserResponse).refreshToken !== undefined
    )
        return true;
    return false;
}
