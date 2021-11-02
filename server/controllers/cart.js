import Cart from "../models/cart.js";
import catchAsync from "../utils/catchAsync.js";

export const checkout = catchAsync(async (req, res, next) => {
  const { products, totalAmount, discount, shippingFree } = req.body;
  const cart = await Cart.create({
    products,
    totalAmount,
    discount,
    shippingFree,
  });

  // send email to user here

  

  res.status(201).json({
    data: cart,
    message: "Successfully create cart",
  });


});
