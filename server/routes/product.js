import express from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
  getProductsBySearch,
} from "../controllers/product.js";
import reviewRouter from "./review.js";

const router = express.Router({ mergeParams: true });
router.use("/:productId/reviews", reviewRouter);

///api/v1/categories/:categoryId/products
router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/search", getProductsBySearch);
router.post("/checkout", )
router.get("/:productId", getProduct);

export default router;
