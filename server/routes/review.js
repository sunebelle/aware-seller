import express from "express";
import {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  setProductUserId,
} from "../controllers/review.js";
import { protect, restrictTo } from "../middleware/protect.js";

const router = express.Router({ mergeParams: true });

//products/:productId/reviews"
router
  .route("/")
  .get(getReviews)
  .post(protect, restrictTo("user"), setProductUserId, createReview);

router.use(protect);
router
  .route("/:reviewId")
  .get(getReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);

export default router;
