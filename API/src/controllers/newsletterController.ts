import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

class NewsletterSubscriberController {

  createRecord = async (req: Request, res: Response) => {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    try {

      const data = await prisma.newsletterSubscriber.create({
        data: {
          email
        }
      });

      res.status(201).json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: 'Failed to create newsletter email'
      });

    }
  };

  deleteRecord = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

      await prisma.newsletterSubscriber.delete({
        where: {
          id: Number(id)
        }
      });

      res.status(200).json({
        message: 'Email deleted'
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: 'Failed to delete email'
      });

    }
  };
}

export const newsletterSubscriberController = new NewsletterSubscriberController();