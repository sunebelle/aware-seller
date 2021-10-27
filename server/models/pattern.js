import mongoose from "mongoose";

const patternSchema = mongoose.Schema(
  {
    name: String, //dresses/top/bottom/
    categories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Style", //mini dress/casual dress/party dress
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
    select: "name",
  });

  next();
});

//This virtual will not appear on the tour DB, but with input if it is populated
patternSchema.virtual("categoryId", {
  ref: "Category",
  foreignField: "categories",
  localField: "_id",
});
const Pattern = mongoose.model("Pattern", patternSchema);

export default Pattern;
