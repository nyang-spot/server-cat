import express from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passports";
import { CORS_CONFIG, PORT, SESSION_OPTION } from "./config";
import { userRouter } from "./usres";
import { catRouter } from "./cats";
import { errorHandler } from "./lib/error-handler";
import { authRouter } from "./auths";
import { requestLoggerMiddleware } from "./middlewares/log";
import { errorMiddleware } from "./middlewares/error";

export const main = async () => {
  // const client = redis.createClient({ url: REDIS_URL });
  // client.on("error", (err) => console.log("Redis Client Error", err));
  // await client.connect();

  const app = express();

  app.use(cors(CORS_CONFIG));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  passportConfig();

  app.use(session({ ...SESSION_OPTION }));
  // app.use(session({ ...SESSION_OPTION, store:  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(requestLoggerMiddleware);

  app.use("/", express.static(path.join(__dirname, "../images")));

  app.get("/ping", (req, res) => {
    res.json({ msg: "pong" });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ msg: "404" });
  });

  app.use(errorMiddleware);

  app.use(authRouter);
  app.use(userRouter);
  app.use(catRouter);

  app.use(errorHandler);

  return app;
};

main().then((app) => {
  app.listen(PORT, () => {
    console.log("street-cat-fighter Server !!, ", PORT);
  });
});
