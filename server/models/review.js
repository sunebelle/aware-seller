import mongoose from "mongoose";
//review/rating/createdAt/ref to product/ ref to user
import Product from "./product.js";

const reviewSchema = mongoose.Schema(
  {
    title: String,
    review: String,
    rating: {
      type: Number,
      required: [true, "Rating must not be empty"],
      min: [1, "Rating has to above 1"],
      max: [5, "Rating has to below 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belongs to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belongs to a user"],
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);
// prevent dublicating review from a user for a product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  // .populate({ path: "product", select: "name" });
  next();
});

reviewSchema.statics.calAverageRatings = async function (productId) {
  // console.log(productId);
  //this refers to this Review model
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log(stats);
  await Product.findByIdAndUpdate(productId, {
    ratingsAverage: stats[0].avgRating,
    ratingsQuantity: stats[0].nRating,
  });
};

reviewSchema.post("save", function () {
  // this points to the current review to be saved to DB
  this.constructor.calAverageRatings(this.product);
  // if (!req.body.product) req.body.product = req.params.productId;
});
const Review = mongoose.model("Review", reviewSchema);

export default Review;

//review => 01 user + 01 product ref
//product => review virtual but exclude product field in DB

//product => array user ref => only admin added product => not needed
