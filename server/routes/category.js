import express from "express";
import { getCategories, getSubCategories } from "../controllers/category.js";
import productRouter from "./product.js";
const router = express.Router();

//api/v1/categories

router.use("/:categoryId/products", productRouter);

router.get("/", getCategories);
router.get("/:categoryId", getSubCategories);

export default router;
