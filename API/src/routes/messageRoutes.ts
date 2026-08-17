import { Router } from 'express';
import { messageController } from '../controllers/messageController.js';
import { authController } from '../controllers/authController.js';

const router = Router();
router.get('/', messageController.getRecords);
router.get('/:id', messageController.getRecord);
router.post('/', messageController.createRecord);
router.delete('/:id', authController.authorize, messageController.deleteRecord);

export const messageRoutes = router;
