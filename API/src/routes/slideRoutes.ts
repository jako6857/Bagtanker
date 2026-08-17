import { Router } from 'express';
import { slideController } from '../controllers/slideController.js';

const router = Router();
router.get('/', slideController.getRecords);

export const slideRoutes = router;
