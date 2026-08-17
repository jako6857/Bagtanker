import { Router } from 'express';
import { productController } from '../controllers/productController.js';

const routes = Router();
routes.get('/', productController.getRecords);
routes.get('/:id', productController.getRecord);

export const productRoutes = routes;
