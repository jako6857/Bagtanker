import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

class FavoriteController {

  createRecord = async (req: Request, res: Response) => {

    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId || !productId) {
      return res.status(400).json({
        error: 'Product and user id are required'
      });
    }

    try {

      const data = await prisma.favorite.upsert({
        where: {
          userId_productId: {
            userId,
            productId: Number(productId)
          }
        },
        create: {
          userId,
          productId: Number(productId)
        },
        update: {}
      });

      res.status(201).json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: 'Failed to create favorite'
      });

    }
  };

  deleteRecord = async (req: Request, res: Response) => {

    const { productId } = req.params;
    const userId = req.user?.id;

    if (!userId || !productId) {
      return res.status(400).json({
        error: 'Product and user id are required'
      });
    }

    try {

      await prisma.favorite.delete({
        where: {
          userId_productId: {
            userId,
            productId: Number(productId)
          }
        }
      });

      res.status(200).json({
        message: 'Favorite deleted'
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: 'Failed to delete favorite'
      });

    }
  };
}

export const favoriteController = new FavoriteController();