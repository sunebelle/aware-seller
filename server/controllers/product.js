import Product from "../models/product.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "successfully create new product",
    data: product,
  });
});

//https://stackoverflow.com/questions/11697483/regexp-regular-expression-find-replace-whole-words-only
export const getAllProducts = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };

  //1, filtering
  // const excludedField = ["page", "sort","color", "size", "category", "price",];
  const excludedField = ["page", "sort", "price", "popularity"];
  excludedField.forEach((el) => delete queryObj[el]);

  const specialField = ["color", "size", "category"];

  specialField.forEach((el) => {
    if (queryObj[el]) {
      return (queryObj[el] = { $in: [queryObj[el]] });
    }
  });

  if (req.query.price) {
    const price = req.query.price;
    const strLength = price.length;
    const index = price.indexOf("-");
    const lowerValue = +price.substr(0, index);
    const greaterValue = +price.substr(index + 1, strLength);
    queryObj["price"] = { $gte: lowerValue, $lte: greaterValue };
  }
  // if (req.query.available === "In-store") {
  //   queryObj["quantity"] = { $gt: 0 };
  // } else if (req.query.available === "Out of stock") {
  //   queryObj["quantity"] = { $eq: 0 };
  // }

  let query = Product.find(queryObj);

  //2. sorting
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("-createdAt"); //newest one appear first
  }

  //3. limit  20 results/ page
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  //Execute query
  const products = await query;
  const totalOfProducts = await Product.countDocuments();

  if (!products) {
    return new AppError("No result found", 404);
  }

  res.status(201).json({
    status: "successfully get all products",
    numberOfPages: Math.ceil(totalOfProducts / limit),
    result: products.length,
    data: products,
  });
});
