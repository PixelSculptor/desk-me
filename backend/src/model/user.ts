import { IUser } from '../types/IUser';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

export const User = model<IUser>('User', userSchema);
