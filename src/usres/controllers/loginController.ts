import type { Request, Response } from "express";
import Prisma from "../../db";
import { loginService } from "../services";

const randomString = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Server에서 name 생성하여 user create
export const loginController = async (
  { query: { location: _location } }: Request<unknown, unknown, { name: string }, { location: string }>,
  res: Response
) => {
  const name = `user${randomString()}`;
  // const location = _location || "gannamgu";

  const user = await loginService({ name }, Prisma);

  res.json({ user });
};
