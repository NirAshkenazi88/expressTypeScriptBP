import { Router, Request, Response } from 'express';
import RequestWithBody from '../../interfaces/RequestWithBody';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('KO');
});

router.post('/', (req: RequestWithBody, res: Response) => {});

export default router;

//api
