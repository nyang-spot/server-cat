import type { Request, Response } from "express";
import Prisma from "../../db";
import { getUserByIdService } from "../../usres";
import { getCatsByLocationService } from "../services/getCatsByLocationService";

// type ReqBody = {
//   name?: string;
// };

type ReqQuery = {
  location?: string;
};

export const getCatsByLocationController = async (req: Request<unknown, unknown, unknown, ReqQuery>, res: Response) => {
  //   @TODO authorization 헤더에 userId를 넣어 주었지만 추후에 JWT 넣어줄 예정
  const userId = req.headers.authorization;
  const location = req.query.location || "gannamgu";
  const user = await getUserByIdService({ id: Number(userId) }, Prisma);
  if (!user) {
    throw new Error("No User");
  }
  if (user.location !== location) {
    throw new Error("No Match Location");
  }
  const cats = await getCatsByLocationService({ location }, Prisma);
  res.json(cats);
};
