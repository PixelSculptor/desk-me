import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config;

function jwtAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw Error('Missing token');
        }
        jwt.verify(token, process.env.SECRET_TOKEN as string, (err) => {
            if (err && err.message === 'jwt expired') {
                throw new Error('Invalid token');
            }
            next();
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            switch (err.message) {
                case 'Missing token':
                    res.status(401).send({
                        code: 401,
                        message: 'Unauthorized',
                        cause: 'Brakujący token',
                    });
                    break;
                case 'Invalid Token':
                    res.status(403).send({
                        code: 403,
                        message: 'Forbidden',
                        cause: 'Nieważny token',
                    });
                    break;
            }
        }
    }
}

export default jwtAuth;
