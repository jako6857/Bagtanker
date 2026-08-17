import { Router } from 'express';
import { favoriteController } from '../controllers/favoriteController.js';
import { authController } from '../controllers/authController.js';

const router = Router();
router.post('/', authController.authorize, favoriteController.createRecord);
router.delete('/:productId', authController.authorize, favoriteController.deleteRecord);

export const favoriteRoutes = router;
