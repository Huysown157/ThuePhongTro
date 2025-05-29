import express from "express";
import favoriteController from "../controllers/favoriteController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/all", verifyToken, favoriteController.getAllByUserId);
router.post("/create", verifyToken, favoriteController.create);
router.delete("/delete", verifyToken, favoriteController.remove);

export default router;
