import Category from "../models/category.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB).then(() => console.log("DB connect successfully"));

const data = [
  {
    name: "Ladies",
    categories: [
      {
        name: "Dresses",
        categories: [
          {
            name: "Casual dresses",
          },
        ],
      },
    ],
  },
];

// Import data into DB
const importData = async (categories) => {
  try {
    const doc = await Category.create(categories);
    console.log("data successfully added to the DB");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//name, level, parentId
async function addList(list, categoryId) {
  list.forEach((item) => {
    importData({
      name: item.name,
      level: 2,
      parentId: categoryId,
    });
  });
}

data.forEach((item) => async () => {
  // const doc = await importData({
  //   name: item.name,
  //   level: 1,
  //   parentId: null,
  // });
  const menu = item.categories;
  try {
    const doc = await Category.create({
      name: item.name,
      level: 1,
      parentId: null,
    });

    if (menu.length) {
      addList(menu, doc._id);
    }
  } catch (error) {
    console.log(error);
  }
  process.exit();
});
