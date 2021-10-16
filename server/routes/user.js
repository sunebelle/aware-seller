import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} from "../controllers/auth.js";
const router = express.Router();
//"/api/v1/user"
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

//Protect all routes after this middleware
router.use(protect);
router.patch("/updatePassword", updatePassword);

export default router;
