import { Router } from 'express';
import CheatsheetController from '../controllers/CheatsheetController';

const router = Router();

router.get('/', CheatsheetController.getList);
router.get('/:id', CheatsheetController.getOneById);

export default router;
