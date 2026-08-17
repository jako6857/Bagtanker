import { Router } from 'express';
import { newsletterSubscriberController } from '../controllers/newsletterController.js';
import { authController } from '../controllers/authController.js';

const router = Router();
router.post('/', newsletterSubscriberController.createRecord);
router.delete('/:id', authController.authorize, newsletterSubscriberController.deleteRecord);

export const newsletterRoutes = router;
