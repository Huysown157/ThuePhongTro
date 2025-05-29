import express from "express";
import * as priceRangeController from "../controllers/priceRangeController";

const router = express.Router();

router.get("/all", priceRangeController.getPriceRanges);
router.get("/:id", priceRangeController.getPriceRange);
router.post("/create", priceRangeController.createPriceRange);
router.put("/update", priceRangeController.updatePriceRange);
router.delete("/delete/:id", priceRangeController.deletePriceRange);

export default router;
