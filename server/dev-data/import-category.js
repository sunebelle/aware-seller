import Category from "../models/category.js";
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB).then(() => console.log("DB connect successfully"));

// const level1 = JSON.parse(
//   fs.readFileSync("./dev-data/categories/level1.json", "utf8")
// );
// const level2 = JSON.parse(
//   fs.readFileSync("./dev-data/categories/level2.json", "utf8")
// );
const level3 = JSON.parse(
  fs.readFileSync("./dev-data/categories/level3.json", "utf8")
);

// Import data into DB
const importData = async () => {
  try {
    // await Category.create(level1);
    // await Category.create(level2);
    await Category.create(level3);
    console.log("data successfully added to the DB");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE all data from DB
const deleteData = async () => {
  try {
    await Category.deleteMany();

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
// node dev-data/import-category.js --import /--delete
