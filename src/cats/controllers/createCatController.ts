import { Request, Response } from "express";
import { createCatService } from "../services";
import Prisma from "../../db";
import { getUserByIdService } from "../../usres/services";

export const createCatController = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new Error("No image file");
  }

  const userId = req.headers.authorization;
  if (!userId) {
    throw new Error("No UserId");
  }

  const user = await getUserByIdService({ id: Number(userId) }, Prisma);
  if (!user) {
    throw new Error("No User");
  }

  const newCat = await createCatService(
    {
      id: Number(userId)
    },
    {
      description: req.body.description,
      location: req.body.location,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      fileName: (req.files as { [fieldname: string]: Express.Multer.File[] }).catImage[0].filename
    },
    Prisma
  );
  res.json({ id: newCat.id });
};
