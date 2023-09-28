import dotenv from 'dotenv';
import express from 'express';
import router from './router/index';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

export const app = express();

const options: cors.CorsOptions = {
    origin: [`${process.env.APP_URL}`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
};

app.use(cors(options));
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', router());
