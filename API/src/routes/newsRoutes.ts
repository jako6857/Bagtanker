import { Router } from 'express';
import { newsController } from '../controllers/newsController.js';

const routes = Router();
routes.get('/', newsController.getRecords);
routes.get('/:slug', newsController.getRecord);

export const newsRoutes = routes;
