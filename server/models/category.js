import mongoose from "mongoose";

//https://www.zappos.com
const categorySchema = mongoose.Schema({
  name: String,
  parentId: mongoose.Schema.ObjectId,
  level: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
