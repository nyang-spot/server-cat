import { Router } from "express";
import { getCatsByLocationController } from "./controllers";
import { asyncHandler } from "../lib/async-handler";
import { authMiddleWare } from "../middlewares";

const catRouter = Router();

catRouter.route("/cats").get(authMiddleWare, asyncHandler(getCatsByLocationController));

export { catRouter };
