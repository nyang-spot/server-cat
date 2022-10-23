import type { Request, Response } from "express";
import Prisma from "../../db";
import { JwtPayload, verify, jwt, verifyRefresh, sign } from "../../lib/jwt";
import { getUserByIdService } from "../../usres";

const JWT_EXPIRED_MSG = "jwt expired";

export const refreshJwtController = async (req: Request, res: Response) => {
  if (!req.headers.authorization || !req.headers.refresh) {
    throw new Error("Access token and Refresh token are need for refresh!");
  }

  const accessToken = req.headers.authorization.split("Bearer ")[1];
  const refreshToken = req.headers.refresh as string;

  const authResult = verify(accessToken);
  const decoded = jwt.decode(accessToken) as JwtPayload;

  if (!decoded) {
    throw new Error();
  }

  // 재발급을 위해서는 access token이 만료되어 있어야합니다.
  if (authResult.ok || authResult.message !== JWT_EXPIRED_MSG) {
    // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
    throw new Error("Access token is not expired!");
  }

  const refreshResult = await verifyRefresh(refreshToken, decoded.id);

  // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
  if (!refreshResult.ok) {
    throw new Error(refreshResult.message);
  }
  // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
  const user = await getUserByIdService({ id: Number(decoded.id) }, Prisma);
  if (!user) {
    throw new Error();
  }

  res.status(200).json({
    success: true,
    error: null,
    response: { accessToken: sign(user), refreshToken }
  });
};
