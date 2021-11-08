import express from "express";
import { checkout, getOrders } from "../controllers/cart.js";
import { protect, restrictTo } from "../middleware/protect.js";
const router = express.Router();

//api/v1/cart/checkout

router.use(protect);

router.get("/", restrictTo("admin"), getOrders);
router.post("/checkout", checkout);

export default router;
