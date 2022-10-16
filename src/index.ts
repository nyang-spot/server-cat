import express from "express";
import cors from "cors";
import path from "path";
import { CORS_CONFIG, PORT } from "./config";
import { userRouter } from "./usres";
import { catRouter } from "./cats";
import { errorHandler } from "./lib/error-handler";

export const main = async () => {
  const app = express();

  app.use(cors(CORS_CONFIG));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", express.static(path.join(__dirname, "../images")));

  app.get("/ping", (req, res) => {
    res.json({ msg: "pong" });
  });

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
