import { Router, type Request, type Response } from "express";
import passport from "passport";
import axios from "axios";
import { CLIENT_DOMAIN } from "../config";
import { asyncHandler } from "../lib/async-handler";
import { refreshJwtController } from "./contorllers";
import { refresh, sign } from "../lib/jwt";
import { getRedis } from "../db/redis";

const REFRESH_TOKEN_EXPIRES = 60 * 60 * 24 * 14; // 2주
function setCookieAndRedirect() {
  return (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("권한 없음.");
    }

    const accessToken = sign(req.user);
    const refreshToken = refresh();
    getRedis().SET(String(req.user.id), refreshToken, { EX: REFRESH_TOKEN_EXPIRES });

    res.cookie("x-auth-cookie", accessToken);
    res.cookie("x-auth-cookie-refresh", refreshToken);

    res.redirect(CLIENT_DOMAIN);
  };
}

const authRouter = Router();

authRouter.route("/refresh").get(asyncHandler(refreshJwtController));

authRouter.route("/kakao").get(
  passport.authenticate("kakao")
  // passport.authenticate("kakao", {
  //   scope: []
  // })
);

authRouter.route("/kakao/callback").get(
  passport.authenticate("kakao", {
    failureRedirect: `${CLIENT_DOMAIN}/login`
  }),
  setCookieAndRedirect()
  // (_, res) => {
  //   res.redirect(`${CLIENT_DOMAIN}/test`);
  // }
);

authRouter.get(
  "/logout",
  asyncHandler(async (req, res) => {
    const KAKAO_ACCESS_TOKEN = req.user?.accessToken;
    if (KAKAO_ACCESS_TOKEN) {
      await axios({
        method: "POST",
        url: "https://kapi.kakao.com/v1/user/unlink",
        headers: {
          Authorization: `Bearer ${KAKAO_ACCESS_TOKEN}`
        }
      });
    }
    req.logOut((error) => {
      if (error) {
        throw new Error(error);
      }
    });
    res.redirect(CLIENT_DOMAIN);
    // await req.session.destroy((err) => {
    //   if (err) {
    //     throw new Error("session is not destroy");
    //   }
    //   req.logOut((error) => {
    //     if (error) {
    //       throw new Error(error);
    //     }
    //   });
    //   res.redirect(CLIENT_DOMAIN);
    // });
  })
);

export { authRouter };
