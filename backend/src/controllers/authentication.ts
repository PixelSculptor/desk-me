import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Error } from 'mongoose';
import { CustomRequest } from '../types/CustomRequest';
import { CustomResponse } from '../types/CustomResponse';
import { IUser } from '../types/IUser';
import { User } from '../model/user';
import { hashInputText } from '../utils/encrypt';

dotenv.config();

export const register = async (
    req: CustomRequest<IUser>,
    res: CustomResponse<IUser>
) => {
    try {
        const { email, name, password, surname } = req.body;

        if (!(email && name && password && surname)) {
            res.status(400).send({
                code: 400,
                message: 'Bad Request',
                cause: 'All inputs are required',
            }).json;
        }

        const isUserCreated = await User.findOne({ email });

        if (isUserCreated) {
            res.status(409).send({
                code: 409,
                message: 'Conflict',
                cause: 'User with this email already exists',
            }).json;
        }

        // encrypt password
        const encryptedPassword = hashInputText(password);
        const user = await User.create({
            name,
            surname,
            email: email.toLowerCase,
            password: encryptedPassword,
        });

        if (!user) {
            throw new Error('Cannot create account');
        }

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

        res.status(201).send({
            code: 201,
            body: user,
        }).json;
    } catch (err: unknown) {
        res.status(403).send({
            code: 403,
            message: 'Unauthorized',
            cause: 'Cannot create account',
        });
    }
};
