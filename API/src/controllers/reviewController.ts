import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { toBoolean } from "../utils/formatter.js";

class ReviewController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const data = await prisma.review.findMany();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  };

  getRecord = async (req: Request, res: Response) => {
    const { reviewId } = req.params;
    const parsedId = Number(reviewId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({ error: "Invalid review id" });
    }

    try {
      const data = await prisma.review.findUnique({
        where: {
          id: parsedId,
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      });
      if (!data) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch review" });
    }
  };

  getRecordsByProductId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await prisma.review.findMany({
        where: {
          productId: Number(id),
        },
        select: {
          title: true,
          comment: true,
          numStars: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  };

  createRecord = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { title, comment, numStars, productId, isActive } = req.body;
    if (!userId || !title || !comment || !numStars || !productId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const data = await prisma.review.create({
        data: {
          title,
          comment,
          numStars: Number(numStars),
          userId: Number(userId),
          productId: Number(productId),
          isActive: toBoolean(isActive),
        },
      });
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create review" });
    }
  };

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, comment, numStars } = req.body;
    try {
      const data = await prisma.review.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          comment,
          numStars: Number(numStars),
        },
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update review" });
    }
  };

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.review.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "Review deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  };
}

export const reviewController = new ReviewController();
