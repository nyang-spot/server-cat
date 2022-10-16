import type { Request, Response } from "express";
import Prisma from "../../db";
import { createFavoriteService } from "../services";

export const createFavoriteController = async (req: Request, res: Response) => {
  const userId = req.headers.authorization;
  if (!userId) {
    throw new Error("No UserId");
  }
  const id = req.params.id;
  if (!id) {
    throw new Error("No CatId");
  }

  const favorite = await createFavoriteService({ userId: Number(userId), catId: Number(id) }, Prisma);
  res.json(favorite);
};
