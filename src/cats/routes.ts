import { Router } from "express";
import { getCatsByLocationController, getCatByIdController, createFavoriteController } from "./controllers";
import { asyncHandler } from "../lib/async-handler";
import { authMiddleWare } from "../middlewares";

const catRouter = Router();

catRouter.route("/cats").get(authMiddleWare, asyncHandler(getCatsByLocationController));
catRouter.route("/cats/:id").get(authMiddleWare, asyncHandler(getCatByIdController));
catRouter.route("/cats/:id/favorite").post(authMiddleWare, asyncHandler(createFavoriteController));

export { catRouter };
