import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticateToken from '../middleware/authenticateToken';

const router = Router();

router.get('/', UserController.getList);
router.get('/:id([0-9]+)', UserController.getOneById);
router.get('/favorites', authenticateToken, UserController.getFavorites);
router.post('/', UserController.createUser);
router.patch('/:id([0-9]+)', UserController.updateUser);
router.delete('/:id([0-9]+)', UserController.deleteUser);

export default router;
