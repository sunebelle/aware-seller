import mongoose from "mongoose";

//https://www.zappos.com
const categorySchema = mongoose.Schema({
  name: String, //ladies/men/boys/girls
  categories: [
    {
      name: String,
      categories: [{ name: String }],
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
    select: "name categories",
  });

  next();
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
