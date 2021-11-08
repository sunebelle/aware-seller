import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name can't be empty"],
      trim: true,
    },
    code: {
      type: String,
      // unique: true,
      default: `AZ-${Math.random().toString().substring(2, 8)}`,
    },
    description: [String],
    price: {
      type: Number,
      required: [true, "A product must have a price"],
      min: [0, "Product price must be above 1"],
      max: [300, "Product price must be below 300"],
      default: 20,
    },
    imageCover: {
      type: String,
      required: [true, "Please provide the product image"],
    },
    images: [String],
    quantity: {
      type: Number,
      required: [true, "Please provide the number of product available"],
      default: 0,
      min: [0, "Quantity must be a positive number"],
    },
    available: {
      type: String,
      default: function (el) {
        if (this.quantity > 0) {
          return (el = "In-store");
        } else {
          return (el = "Out-of-stock");
        }
      },
    },
    size: {
      type: [String],
      // type: String,
      required: [true, "Please provide the size of product"],
      enum: {
        values: ["S", "M", "L", "XLL"],
        message: "Size is either: S, M, L, XLL",
      },
    },
    color: {
      type: [String],
      required: [true, "Please provide the color of product"],
      //red, light-gold, cornflower, orange,charcoal-grey,white, black
    },
    brand: {
      type: String,
      required: [true, "Please provide the brand of product"],
      //Zara, H&M,Pull&Bear,Dior,Chanel
    },

    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must belongs to a category"],
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//This virtual will not appear on the tour DB, but with input if it is populated
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

export default Product;
