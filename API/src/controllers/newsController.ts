import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

class NewsController {

  getRecords = async (req: Request, res: Response) => {

    try {

      const data = await prisma.news.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          teaser: true,
          imageUrl: true
        },
        where: {
          isActive: true
        }
      });

      res.json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: 'Failed to fetch news'
      });

    }
  };

  getRecord = async (req: Request, res: Response) => {

    const { slug } = req.params;

    try {

      const data = await prisma.news.findFirst({
        where: {
          slug,
          isActive: true
        }
      });

      if (!data) {
        return res.status(404).json({
          error: 'News not found'
        });
      }

      res.json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: 'Failed to fetch news'
      });

    }
  };
}

export const newsController = new NewsController();