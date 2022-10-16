import { Router } from "express";
import multer from "multer";
import path from "path";
import { getCatsByLocationController, getCatByIdController, createFavoriteController, createCatController } from "./controllers";
import { asyncHandler } from "../lib/async-handler";
import { authMiddleWare } from "../middlewares";

const catRouter = Router();
const upload = multer({
  // dest: "./images",
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // 확장자 추출
      cb(null, `${Date.now()}${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      return cb(null, true);
    }
    return cb(null, false);
  }
});

catRouter.route("/cats").get(authMiddleWare, asyncHandler(getCatsByLocationController));
catRouter.route("/cats/:id").get(authMiddleWare, asyncHandler(getCatByIdController));
catRouter.route("/cats/:id/favorite").post(authMiddleWare, asyncHandler(createFavoriteController));
catRouter
  .route("/cats")
  .post(
    authMiddleWare,
    upload.fields([{ name: "catImage" }, { name: "description" }, { name: "latitude" }, { name: "longitude" }]),
    asyncHandler(createCatController)
  );

export { catRouter };
