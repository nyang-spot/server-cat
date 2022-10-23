import type { Request, Response } from "express";
import Prisma from "../../db";
import { getUserByIdService } from "../../usres";
import { getCatByIdService } from "../services";

// type ReqQuery = {
//   location?: string;
// };

type ReqParam = {
  id?: string;
};

export const getCatByIdController = async (req: Request<ReqParam, unknown, unknown>, res: Response) => {
  //   @TODO authorization 헤더에 userId를 넣어 주었지만 추후에 JWT 넣어줄 예정
  const userId = req.headers.authorization;
  if (!userId) {
    throw new Error("No UserId");
  }

  const catId = req.params.id;

  if (!catId) {
    throw new Error("No CatId");
  }
  // const location = req.query.location || "gannamgu";
  const user = await getUserByIdService({ id: Number(userId) }, Prisma);
  if (!user) {
    throw new Error("No User");
  }

  const cat = await getCatByIdService({ id: user.id, catId: Number(catId), location: user.location! }, Prisma);
  res.json(cat);
};
