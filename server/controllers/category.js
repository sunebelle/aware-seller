import Category from "../models/category.js";
import Pattern from "../models/pattern.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    result: categories.length,
    data: categories,
  });
});
export const getAllPatterns = catchAsync(async (req, res, next) => {
  const patterns = await Pattern.find();
  res.status(200).json({
    status: "success",
    result: patterns.length,
    data: patterns,
  });
});
