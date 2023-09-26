import dotenv from 'dotenv';
import express from 'express';
import router from './router/index';

dotenv.config();

export const app = express();

app.use(express.json());
app.use('/auth', router());

// app.get("/login", (req: Request, res: Response) => {

// })
