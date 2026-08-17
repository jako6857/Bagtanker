import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

class UserController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
        },
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

  getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          description: true,
          image: true,
          isActive: true,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };

  createRecord = async (req: Request, res: Response) => {
    const {
      firstname,
      lastname,
      email,
      password,
      description,
      image,
      refreshToken,
      isActive,
    } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          description,
          image,
          refreshToken,
          isActive: Boolean(isActive),
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  };

  updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      password,
      description,
      image,
      refreshToken,
      isActive,
    } = req.body;
    try {
      const dataToUpdate: any = {};

      if (firstname !== undefined) dataToUpdate.firstname = firstname;
      if (lastname !== undefined) dataToUpdate.lastname = lastname;
      if (email !== undefined) dataToUpdate.email = email;
      if (description !== undefined) dataToUpdate.description = description;
      if (image !== undefined) dataToUpdate.image = image;
      if (refreshToken !== undefined) dataToUpdate.refreshToken = refreshToken;
      if (isActive !== undefined) dataToUpdate.isActive = Boolean(isActive);
      if (password !== undefined && password !== "") {
        dataToUpdate.password = await bcrypt.hash(password, 10);
      }

      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: dataToUpdate,
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  };

  deleteRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
}

export const userController = new UserController();
