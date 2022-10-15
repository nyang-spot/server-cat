import { Router } from "express";
import { asyncHandler } from "../lib/async-handler";
import { loginController } from "./controllers/loginController";

const userRouter = Router();

userRouter.route("/login").get(asyncHandler(loginController));

export { userRouter };
