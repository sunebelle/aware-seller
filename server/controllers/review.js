import catchAsync from "../utils/catchAsync.js";
import Review from "../models/review.js";
import AppError from "../utils/appError.js";

export const setProductUserId = (req, res, next) => {
  // console.log(req.user);
  //allowed nested routes
  if (!req.body.product) req.body.product = req.params.productId; //productId from URL
  if (!req.body.user) req.body.user = req.user._id; //id from protect middleware, token
  next();
};

export const getReviews = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const reviews = await Review.find({ product: productId }).sort("-createdAt");
  if (!reviews) {
    return new AppError("No result found", 404);
  }

  res.status(201).json({
    status: "successfully get reviews",
    result: reviews.length,
    data: reviews,
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  //check again with FE
  const { title, review, rating, product, user } = req.body;
  const obj = { title, review, rating, product, user };
  let updateField = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== "")
  );
  // console.log(updateField);

  let doc = await Review.create(updateField);
  doc = await doc.populate({
    path: "user",
    select: "name",
  });

  res.status(201).json({
    data: doc,
    message: "Successfully create new review",
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  // console.log(reviewId);

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError("No review was found", 404));
  }

  res.status(201).json({
    data: review,
    message: "The review with provided ID is being found",
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  //check again with FE
  const { title, review, rating } = req.body;
  const doc = await Review.findByIdAndUpdate(
    req.params.reviewId,
    { title, review, rating },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    return next(new AppError("No document was found", 404));
  }
  res.status(200).json({
    data: doc,
    message: "successfully updated the document",
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const deletedDoc = await Review.findByIdAndDelete(reviewId);

  if (!deletedDoc) {
    return next(new AppError("No document was found", 404));
  }
  res.status(200).json({
    message: "succefully deleted the document with given Id",
    data: deletedDoc,
  });
});
