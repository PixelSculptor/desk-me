import { UserCredentialTypes } from '../../types/UserTypes';

export type RegisterFieldsTypes = {
    confirmPassword: string;
} & UserCredentialTypes;
