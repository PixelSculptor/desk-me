import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Error } from 'mongoose';
import { CustomRequest } from '../types/CustomRequest';
import { CustomResponse } from '../types/CustomResponse';
import { IUserResponse, IUserBody, signUpSchema } from '../types/UserTypes';
import { User } from '../model/user';
import { hashInputText } from '../utils/encrypt';

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

        const userResponse: IUserResponse = {
            email: user.email,
            name: user.name,
            surname: user.surname,
            token: user.token,
        };

        res.status(201)
            .send({
                code: 201,
                body: userResponse,
            })
            .end();
    } catch (err: unknown) {
        res.status(403)
            .json({
                code: 403,
                message: 'Unauthorized',
                cause: 'Nie można było utworzyć konta',
            })
            .end();
    }
};
