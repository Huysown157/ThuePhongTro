import express from "express";
import * as areaRangeController from "../controllers/areaRangeController";

const router = express.Router();

router.get("/all", areaRangeController.getAreaRanges);
router.get("/:id", areaRangeController.getAreaRange);
router.post("/create", areaRangeController.createAreaRange);
router.put("/update", areaRangeController.updateAreaRange);
router.delete("/delete/:id", areaRangeController.deleteAreaRange);

export default router;
