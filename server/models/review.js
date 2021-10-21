import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      //   required: [true, "review can't be empty"],
    },
    rating: Number,
    user: {
      type: String,
      ref: "User",
      required: [true, "review must belongs to a user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "review must be about a product"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// you only can create a comment for a product
// reviewSchema.index({ product: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;

//review => 01 user + 01 product ref
//product => array user ref
//product => review virtual but exclude product field