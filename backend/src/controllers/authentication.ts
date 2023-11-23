import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Error } from 'mongoose';

import { CustomRequest } from '../types/CustomRequest';
import { CustomResponse } from '../types/CustomResponse';
import {
    IUserResponse,
    IUserBody,
    signUpSchema,
    IUserLoginBody,
    signInSchema,
} from '../types/UserTypes';
import { hashInputText } from '../utils/encrypt';

import { User } from '../model/user';

dotenv.config();

export const register = async (
    req: CustomRequest<IUserBody>,
    res: CustomResponse<IUserResponse>
) => {
    try {
        const { email, name, password, surname } = req.body;
        const result = signUpSchema.safeParse(req.body);

        if (!result.success) {
            return res
                .status(400)
                .send({
                    code: 400,
                    message: 'Bad Request',
                    cause: 'Wszystkie pola są wymagane',
                })
                .end();
        }

        const isUserCreated = await User.findOne({ email });

        if (isUserCreated) {
            return res
                .status(409)
                .send({
                    code: 409,
                    message: 'Conflict',
                    cause: 'Użytkownik o podanym adresie e-mail już istnieje',
                })
                .end();
        }

        // encrypt password
        const encryptedPassword = hashInputText(password);
        const user = await new User({
            name,
            surname,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        await user.save();

        if (!user) {
            throw new Error('Nie można było utworzyć konta');
        }

        // create JWT token
        const accessToken = jwt.sign(
            {
                user_id: user.id,
                email,
            },
            process.env.SECRET_TOKEN as string,
            {
                expiresIn: 600,
            }
        );

        const refreshToken = jwt.sign(
            {
                user_id: user.id,
                email,
            },
            process.env.SECRET_TOKEN as string,
            {
                expiresIn: 1800,
            }
        );

        const userResponse: IUserResponse = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            accessToken,
            refreshToken,
        };

        res.status(201).send({ ...userResponse });
    } catch (err: unknown) {
        res.status(403)
            .send({
                code: 403,
                message: 'Unauthorized',
                cause: 'Nie można było utworzyć konta',
            })
            .end();
    }
};

export const login = async (
    req: CustomRequest<IUserLoginBody>,
    res: CustomResponse<IUserResponse>
) => {
    try {
        const { email, password } = req.body;
        const result = signInSchema.safeParse(req.body);

        if (!result.success) {
            return res
                .status(400)
                .send({
                    code: 400,
                    cause: 'Wszystkie pola są wymagane',
                    message: 'Bad Request',
                })
                .end();
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log('error');
            throw new Error('Użytkownik nie istnieje');
        }

        const expectedPassword = hashInputText(password);

        if (user.password !== expectedPassword) {
            return res
                .status(403)
                .send({
                    code: 403,
                    cause: 'Wprowadzone hasło jest błędne',
                    message: 'Unauthorized',
                })
                .end();
        }

        const accessToken = jwt.sign(
            {
                user_id: user.id,
                email,
            },
            process.env.SECRET_TOKEN as string,
            {
                expiresIn: 600,
            }
        );
        const refreshToken = jwt.sign(
            {
                user_id: user.id,
                email,
            },
            process.env.SECRET_TOKEN as string,
            { expiresIn: 1800 }
        );

        const userLoggedPayload: IUserResponse = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            accessToken,
            refreshToken,
        };

        return res
            .status(200)
            .send({ ...userLoggedPayload })
            .end();
    } catch (err: unknown) {
        return res
            .status(404)
            .send({
                code: 404,
                message: 'Not Found',
                cause: 'Użytkownik nie istnieje',
            })
            .end();
    }
};

export const rereshToken = (
    req: CustomRequest<Pick<IUserResponse, 'refreshToken' | 'id' | 'email'>>,
    res: CustomResponse<Pick<IUserResponse, 'accessToken'>>
) => {
    try {
        const { refreshToken, id, email } = req.body;
        if (!refreshToken) {
            return res
                .status(401)
                .send({
                    code: 401,
                    cause: 'Brakujący żeton',
                    message: 'Unauthorized',
                })
                .end();
        }

        const verify = jwt.verify(
            refreshToken,
            process.env.SECRET_TOKEN as string
        );
        if (!verify) throw new Error('Invalid refresh token');
        const refreshedToken = jwt.sign(
            {
                user_id: id,
                email,
            },
            process.env.SECRET_TOKEN as string,
            { expiresIn: 600 }
        );
        return res
            .status(200)
            .send({
                accessToken: refreshedToken,
            })
            .end();
    } catch (err: unknown) {
        res.status(403).send({
            code: 403,
            message: 'Forbidden',
            cause: (err as Error).message,
        });
    }
};
