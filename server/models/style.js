import mongoose from "mongoose";

const styleSchema = mongoose.Schema(
  {
    name: String, //mini dress, casual dress

    pattern: {
      type: mongoose.Schema.ObjectId,
      ref: "Pattern",
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

styleSchema.virtual("PatternId", {
  ref: "Pattern",
  foreignField: "categories",
  localField: "_id",
});
const Style = mongoose.model("Style", styleSchema);

export default Style;
