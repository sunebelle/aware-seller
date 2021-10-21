import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
