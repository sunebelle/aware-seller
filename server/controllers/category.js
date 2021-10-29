import Category from "../models/category.js";
import catchAsync from "../utils/catchAsync.js";

//https://stackoverflow.com/questions/36019713/mongodb-nested-lookup-with-3-levels

export const getCategories = catchAsync(async (req, res, next) => {
  // const categories = await Category.find({ level: 1 });
  const categories = await Category.aggregate([
    { $match: { level: { $lte: 1 } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "parentId",
        as: "categories",
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    result: categories.length,
    data: categories,
  });
});

export const getSubCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ parentId: req.params.categoryId });

  res.status(200).json({
    status: "success",
    result: categories.length,
    data: categories,
  });
});
