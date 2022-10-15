import express from "express";
import cors from "cors";
import { CORS_CONFIG, PORT } from "./config";
import { userRouter } from "./usres";

export const main = async () => {
  const app = express();

  app.use(cors(CORS_CONFIG));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/ping", (req, res) => {
    res.json({ msg: "pong" });
  });

  app.use(userRouter);

  return app;
};

main().then((app) => {
  app.listen(PORT, () => {
    console.log("street-cat-fighter Server !!, ", PORT);
  });
});
