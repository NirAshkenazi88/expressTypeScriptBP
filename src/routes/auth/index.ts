import { Router, Request, Response } from 'express';
import RequestWithBody from '../../interfaces/RequestWithBody';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { auth } from '../../db/mysql';
import { checkJWT } from '../../middlewares/Authentication';

import { registrationSchema, loginSchema } from '../../validationSchemas';
import { User, LoginUser } from '../../interfaces/User';

const router = Router();

router.get('/', [checkJWT], (req: Request, res: Response) => {
  res.send('OK');
});

router.post('/register', async (req: RequestWithBody, res: Response) => {
  try {
    const body: User = await registrationSchema.validateAsync(req.body);
    if (body) {
      body.password = bcrypt.hashSync(body.password, 8);
      const reg = await auth.register(body);
      if (reg.success) {
        const token = jwt.sign({ id: reg.result.insertId }, config.appSecert, {
          expiresIn: 86400,
        });
        res.status(200).send({ auth: true, token });
      } else {
        res.status(403).send({ auth: false });
      }
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post('/login', async (req: RequestWithBody, res: Response) => {
  try {
    const body: LoginUser = await loginSchema.validateAsync(req.body);
    if (body) {
      const login = await auth.login(body);
      if (login.loginSuccess) {
        const token = jwt.sign({ id: login.result }, config.appSecert, {
          expiresIn: 86400,
        });
        res.status(200).send({ auth: true, token });
      } else {
        res.status(403).send({ auth: false });
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;

// auth
