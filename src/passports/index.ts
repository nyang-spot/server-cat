import { Users } from "@prisma/client";
import passport from "passport";
import kakao from "./kakao-strategy";

export default () => {
  passport.serializeUser((user: Users, done) => {
    return done(null, user);
  });
  passport.deserializeUser(async (user: Users, done) => {
    if (!user) {
      return done(new Error());
    }
    return done(null, user);
  });

  kakao();
};
