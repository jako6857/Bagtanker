import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';

const routes = Router();
routes.get('/', categoryController.getRecords);
routes.get('/:slug', categoryController.getRecord);

export const categoryRoutes = routes;
