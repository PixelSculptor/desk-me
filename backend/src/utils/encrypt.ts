import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const hashInputText = (text: string) => {
    return crypto
        .createHmac('sha256', text)
        .update(process.env.SECRET_TOKEN as string)
        .digest('hex');
};
