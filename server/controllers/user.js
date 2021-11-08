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
  // const obj = {name: req.body.name, email: req.body.email}
  if (req.body.password) {
    return next(new AppError("This route is not for updating password", 400));
  }
  //https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
  // let updateField = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
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
      user: updatedUser,
    },
  });
});
