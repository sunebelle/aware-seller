import fs from "fs";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Review from "../models/review.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB).then(() => console.log("DB connect successfully"));

// Read json file
const products = JSON.parse(
  fs.readFileSync("./dev-data/products/products.json", "utf8")
);
const boys = JSON.parse(
  fs.readFileSync("./dev-data/products/boys.json", "utf8")
);
const girls = JSON.parse(
  fs.readFileSync("./dev-data/products/girls.json", "utf8")
);
const ladies = JSON.parse(
  fs.readFileSync("./dev-data/products/ladies.json", "utf8")
);
const men = JSON.parse(fs.readFileSync("./dev-data/products/men.json", "utf8"));

const users = JSON.parse(
  fs.readFileSync("./dev-data/users/users.json", "utf8")
);

// Import data into DB
const importData = async () => {
  try {
    await Product.create(products);
    await Product.create(boys);
    await Product.create(girls);
    await Product.create(ladies);
    await Product.create(men);
    await User.create(users);
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
    await User.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
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
