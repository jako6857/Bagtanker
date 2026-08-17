import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

class CategoryController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const data = await prisma.category.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          description: true
        },
        where: {
          isActive: true
        }
      });

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  };

  getRecord = async (req: Request, res: Response) => {
    const { slug } = req.params;

    try {
      const data = await prisma.category.findFirst({
        where: {
          slug,
          isActive: true
        },
        include: {
          categoryProducts: {
            select: {
              products: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  description: true,
                  imageUrl: true
                }
              }
            }
          }
        }
      });

      if (!data) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  };
}

export const categoryController = new CategoryController();