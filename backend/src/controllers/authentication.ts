import { CustomRequest } from '../types/CustomRequest';
import { IUser } from '../types/IUser';
import { Response } from 'express';
import { User } from '../model/user';
// import { hashInputText } from '../utils/encrypt';

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
        // const encryptedPassword = hashInputText(password);
    } catch (err: unknown) {
        res.status(403).json({ message: 'Cannot create account' });
    }
};
