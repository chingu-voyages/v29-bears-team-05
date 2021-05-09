import { Router } from 'express';
import auth from './auth';
import user from './user';
import sheet from './sheet';

const routes = Router();

routes.use('/ping', (_req, res) => res.status(200).json({ text: 'Pong' }));
routes.use('/auth', auth);
routes.use('/sheet', sheet);
routes.use('/user', user);

export default routes;
