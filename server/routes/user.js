import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/auth.js";
import { getAllUsers, updateUser } from "../controllers/user.js";
import { protect, restrictTo } from "../middleware/protect.js";
const router = express.Router();

//"/api/v1/user"
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

//Protect all routes after this middleware
router.use(protect);
router.get("/", restrictTo("admin"), getAllUsers);
router.patch("/update-user", updateUser);
router.patch("/update-password", updatePassword);

export default router;
