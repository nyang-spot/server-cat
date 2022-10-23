import type { Request, Response } from "express";
import Prisma from "../../db";
import { loginService } from "../services";

const randomString = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

/**
 * @depreated Use auth/routes
 */
export const loginController = async (
  { query: { location: _location } }: Request<unknown, unknown, { name: string }, { location: string }>,
  res: Response
) => {
  // @TODO 추후에 카카오 소셜 로그인 구현할 때 마이페이지에서 수정을 하거나
  // 소셜 로그인 후 바로 name 수정 페이지로 이동하게 해서 넣어 주는 것으로 구현
  const name = `user${randomString()}`;
  const location = _location || "gannamgu";

  const user = await loginService({ name, location }, Prisma);

  res.json(user);
};
