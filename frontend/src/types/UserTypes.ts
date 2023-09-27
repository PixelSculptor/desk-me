export type UserCredentialTypes = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

export type UserModelTypes = {
    token: string;
} & UserCredentialTypes;
