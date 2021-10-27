import express from "express";
import { getAllCategories, getAllPatterns } from "../controllers/category.js";
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getAllPatterns);

export default router;
