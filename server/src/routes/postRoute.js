import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import * as postController from "../controllers/postController";
const router = Router();

router.get("/all", postController.getPost);
router.get("/limit", postController.getPostLimit);
router.get("/new-post", postController.getNewPost);
router.get("/one/:id", postController.getPostById);

router.post("/create-post", verifyToken, postController.createPost);
router.get("/limit-by-user", verifyToken, postController.getPostLimitByUserId);
router.delete("/delete", verifyToken, postController.deletePost);
router.put("/update", verifyToken, postController.updatePost);

export default router;
