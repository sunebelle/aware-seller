import express from "express";
import { getAllCategories, getAllPatterns } from "../controllers/category.js";
import {
  getAllProducts,
  createProduct,
  getProduct,
} from "../controllers/product.js";

const router = express.Router();
///api/v1/products
router.get("/", getAllProducts);
router.post("/", createProduct);
// router.route("/:id").get(getProduct);
router.get("/:id", getProduct);
// router.get("/categories", getAllCategories);
// router.get("/categories/:id", getAllPatterns);

export default router;
