import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Error } from 'mongoose';
import { CustomRequest } from '../types/CustomRequest';
import { IUser } from '../types/IUser';
import { Response } from 'express';
import { User } from '../model/user';
import { hashInputText } from '../utils/encrypt';

dotenv.config();

export const register = async (req: CustomRequest<IUser>, res: Response) => {
    try {
        const { email, name, password, surname } = req.body;

        if (!(email && name && password && surname)) {
            res.status(400).send('All inputs are required');
        }

        const isUserCreated = await User.findOne({ email });

        if (isUserCreated) {
            res.status(409).send('User with this email already exists');
        }

        // encrypt password
        const encryptedPassword = hashInputText(password);
        const user = await User.create({
            name,
            surname,
            email: email.toLowerCase,
            password: encryptedPassword,
        });

        // create JWT token
        const jwtToken = jwt.sign(
            {
                user_id: name,
                surname,
            },
            process.env.SECRET_TOKEN as string,
            {
                expiresIn: '1h',
            }
        );

        user.token = jwtToken;

        res.status(201).json(user);
    } catch (err: unknown) {
        console.log((err as Error).message);
        res.status(403).json({ message: 'Cannot create account' });
    }
};
