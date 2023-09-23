import dotenv from 'dotenv';
import express from 'express';
import { Response } from 'express';
import { CustomRequest } from './types/CustomRequest';
import { IUser } from './types/IUser';
import { User } from './model/user';

dotenv.config();

export const app = express();

app.use(express.json());

app.post('/register', async (req: CustomRequest<IUser>, res: Response) => {
    try {
        const { email, name, password, surname } = req.body;

        if (!(email && name && password && surname)) {
            res.status(400).send('All inputs are required');
        }

        const isUserCreated = await User.findOne({ email });

        if (isUserCreated) {
            res.status(409).send('User with this email already exists');
        }
    } catch (err: unknown) {
        res.status(403).json({ message: 'Cannot create account' });
    }
});

// app.get("/login", (req: Request, res: Response) => {

// })
