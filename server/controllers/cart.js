import Cart from "../models/cart.js";
import catchAsync from "../utils/catchAsync.js";
import Email from "../utils/email.js";
import User from "../models/user.js";

export const checkout = catchAsync(async (req, res, next) => {
  const { products, totalAmount, discount, shippingFree } = req.body;
  const user = await User.findById(req.user._id);
  // console.log(user);
  const data = { products, totalAmount, discount, shippingFree };
  const cart = await Cart.create(data);

  // send email to user here
  await new Email(user, data).sendCheckout();

  res.status(201).json({
    data: cart,
    message: `Successfully sent email to ${user.email}`,
  });
});

export const getOrders = catchAsync(async (req, res, next) => {
  const orders = await Cart.find();
  res.status(200).json({
    status: "success",
    result: orders.length,
    data: orders,
  });
});
