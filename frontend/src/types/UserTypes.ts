export type UserCredentialTypes = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

export type UserModelTypes = {
    token: string;
} & UserCredentialTypes;

export type UserResponse = {
    id: string;
    accessToken: string;
    refreshToken: string;
} & Omit<UserCredentialTypes, 'password'>;
