import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: users,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  if (req.body.password) {
    return next(new AppError("This route is not for updating password", 400));
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
    message: "successfully updated user's doc",
  });
});
