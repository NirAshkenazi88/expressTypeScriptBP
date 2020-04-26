import express, { Request, Response } from 'express';
import authRouter from './routes/api';
import config from './config';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

app.listen(config.APP_PORT);
