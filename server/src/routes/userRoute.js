import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/userController";

const router = express.Router();

// router.use(verifyToken);
router.get("/get-current", verifyToken, userController.getCurrentUser);
router.get("/all", userController.getUsers);
router.get("/:id", userController.getUser);
router.put("/update/", verifyToken, userController.updateUser);
router.delete("/delete/:id", verifyToken, userController.deleteUser);

export default router;
