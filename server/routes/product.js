import express from "express";
import { getAllCategories, getAllPatterns } from "../controllers/category.js";
import { getAllProducts, createProduct } from "../controllers/product.js";

const router = express.Router();
///api/v1/products
router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/ladies/patterns", getAllPatterns);
router.get("/ladies/dresses/categories", getAllCategories);

export default router;
