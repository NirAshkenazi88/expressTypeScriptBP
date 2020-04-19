import express, { Request, Response } from 'express';
import authRouter from './routes/api';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

app.listen(3000);
