import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: [
    {
      _id: mongoose.Schema.ObjectId,
      name: String,
      code: String,
      description: [String],
      price: Number,
      imageCover: String,
      images: [String],
      quantity: Number,
      available: String,
      size: String,
      color: String,
      brand: String,
      category: [mongoose.Schema.ObjectId],
      ratingsAverage: Number,
      ratingsQuantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  discount: Number,
  shippingFree: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
