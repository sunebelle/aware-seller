import express from "express";
import { register, login } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", (req, res) => res.send("Hello world"));

export default router;
