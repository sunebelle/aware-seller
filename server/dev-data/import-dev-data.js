import fs from "fs";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Pattern from "../models/pattern.js";
// import Review from "../models/review.js";
// import User from "../models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB).then(() => console.log("DB connect successfully"));

// Read json file
const products = JSON.parse(
  fs.readFileSync("./dev-data/products/products.json", "utf8")
);
const patterns = JSON.parse(
  fs.readFileSync("./dev-data/patterns/ladies.json", "utf8")
);
const categories = JSON.parse(
  fs.readFileSync("./dev-data/categories/dresses.json", "utf8")
);

// not working on yet
// const reviews = JSON.parse(
//   fs.readFileSync("./dev-data/reviews/reviews.json", "utf8")
// );
// const users = JSON.parse(
//   fs.readFileSync("./dev-data/users/users.json", "utf8")
// );

// Import data into DB
const importData = async () => {
  try {
    await Product.create(products);
    // await Pattern.create(patterns);
    // await Category.create(categories);
    // await Review.create(reviews);
    // await User.create(users, { validateBeforeSave: false });
    console.log("data successfully added to the DB");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE all data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    // await Pattern.deleteMany();
    // await Category.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data successfully deleted from the DB");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
// console.log(process.argv);
// node dev-data/import-dev-data.js --import /--delete
