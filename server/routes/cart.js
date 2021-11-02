import express from "express";
import { checkout } from "../controllers/cart.js";
import { protect } from "../middleware/protect.js";
const router = express.Router();

//api/v1/cart/checkout

router.use(protect);

router.post("/checkout", checkout);

export default router;
