import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { getRedis } from "../db/redis";

export { jwt };

const JWT_ALGORITHM = "HS256";
const ACCESS_TOKEN_EXPIRES = "1h";
const REFRESH_TOKEN_EXPIRES = "14d";

export type JwtPayload = { id: string };

export const sign = (user: Users) => {
  const payload: JwtPayload = { id: String(user.id) };

  return jwt.sign(payload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: ACCESS_TOKEN_EXPIRES
  });
};

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    return { ok: true, id: decoded.id };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message
    };
  }
};

export const refresh = () => {
  return jwt.sign({}, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: REFRESH_TOKEN_EXPIRES
  });
};

export const verifyRefresh = async (token: string, userId: string) => {
  try {
    const data = await getRedis().get(userId);

    if (token !== data) {
      return {
        ok: false,
        message: "In valid refresh token"
      };
    }
    jwt.verify(token, JWT_SECRET);

    // return true
    return {
      ok: true
    };
  } catch (error: any) {
    // return false
    return {
      ok: false,
      message: error.message
    };
  }
};
