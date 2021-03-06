import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticateToken from '../middleware/authenticateToken';

const router = Router();

router.get('/', UserController.getList);
router.get('/id/:id', UserController.getOneById);
router.get('/favorites', authenticateToken, UserController.getFavorites);
router.post('/favorites', authenticateToken, UserController.addFavorite);
router.delete('/favorites', authenticateToken, UserController.deleteFavorite);
router.post('/', UserController.createUser);
router.patch('/id/:id', UserController.updateUser);
router.delete('/id/:id', UserController.deleteUser);

export default router;
