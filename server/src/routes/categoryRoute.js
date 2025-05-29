import express from "express";
import * as categoryController from "../controllers/categoryController";

const router = express.Router();

router.get("/all", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
// router.get("/by-postId/:postId", categoryController.getCategoryByPostId);
router.post("/create", categoryController.createCategory);
router.put("/update", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;
