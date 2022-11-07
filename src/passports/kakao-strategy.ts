/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { KAKAO_CONFIG } from "../config";
import prisma from "../db/index";
import { getUserByEmail } from "../usres";
import { createUserService } from "../usres/services";

const randomString = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export default () => {
  passport.use(
    new KakaoStrategy({ ...KAKAO_CONFIG }, async (accessToken, _refreshToken, profile, cb) => {
      const { has_email, email, name: _name } = profile._json.kakao_account;
      if (!has_email || !email) {
        return cb(new Error("Not Found Email"));
      }

      const name = _name || `user${randomString()}`;

      // @TODO 나중에 바꿔야함.
      const location = "gannamgu";
      const user = await getUserByEmail({ email }, prisma);

      if (!user) {
        const createdUser = await createUserService({ location, name, email }, prisma);

        return cb(null, { ...createdUser, accessToken });
      }
      return cb(null, { ...user, accessToken });
    })
  );
};
