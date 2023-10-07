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
    accessToken: string;
    refreshToken: string;
    id: string;
} & Omit<UserCredentialTypes, 'password'>;
