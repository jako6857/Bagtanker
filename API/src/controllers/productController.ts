import { Request, Response } from "express";
import { prisma } from "../prisma.js";

class ProductController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          price: true,
        },
      });

      res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to fetch products",
      });
    }
  };

  getRecordsByCategory = async (req: Request, res: Response) => {
    const { slug } = req.params;

    try {
      const data = await prisma.product.findMany({
        where: {
          categoryProducts: {
            some: {
              categories: {
                slug: String(slug),
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          price: true,
        },
      });

      res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to fetch products",
      });
    }
  };

  getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    try {
      const data = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          productIngredients: {
            include: {
              ingredients: {
                select: {
                  title: true,
                },
              },
              units: {
                select: {
                  name: true,
                  abbreviation: true,
                },
              },
            },
          },
        },
      });

      if (!data) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to fetch product",
      });
    }
  };
}

export const productController = new ProductController();
