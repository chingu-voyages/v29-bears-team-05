import { Router } from 'express';
import CheatsheetController from '../controllers/CheatsheetController';

const router = Router();

router.get('/', CheatsheetController.getList);
router.get('/:id([0-9]+)', CheatsheetController.getOneById);

export default router;
