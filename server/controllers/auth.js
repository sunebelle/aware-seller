import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import dotenv from "dotenv";
dotenv.config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    domain: "https://aware-intern.web.app",
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // console.log(token);

  // remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
    message,
  });
};
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      new AppError("E-mail already exists. Please enter another name", 400)
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });
  createSendToken(newUser, 201, res, "successfully create new account");
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide your email and password", 400));
  }
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    return next(new AppError("Found no user with given email", 404));
  }
  const isValid = await existingUser.correctPassword(
    password,
    existingUser.password
  );

  if (!isValid) {
    return next(new AppError("Your e-mail/password is invalid!", 400));
  }
  createSendToken(existingUser, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }
  // 2. generate random reset token
  const resetToken = user.createPasswordResetToken();

  // save passwordResetToken & passwordResetExpires to the DB (at createPasswordResetToken() user Model)
  await user.save({ validateBeforeSave: false });
  // await user.save();
  // 3. send it to user's email
  try {
    // console.log(req.protocol); || http
    // console.log(req.get("host")); || localhost: 5000

    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/user/reset-password/${resetToken}`;
    const resetURL = `http://localhost:3000/user/reset-password/${resetToken}`;
    const message = `Please click the link below to enter your new password.\n${resetURL}.\nIf you do not forget password, please ignore this email.`;
    await sendEmail({
      subject: "Forgot Password (valid for 10 mins)",
      to: user.email,
      text: message,
    });

    res.status(200).json({
      status: "success",
      message: "Token is sent to email",
    });
  } catch (error) {
    // console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  //  1. get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //  2. if token is not expired, and there is a user, set new password
  if (!user) {
    return next(new AppError("Token is invalid or expired", 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //  3. update changePasswordAt property for the user
  //  4. Log the user in, send JWT
  createSendToken(user, 201, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  //1. get user from collection
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(
      new AppError("Please provide your password and new password", 400)
    );
  }
  const user = await User.findById(req.user.id).select("+password");
  //2. check if the posted password is correct
  const validPassword = await bcrypt.compare(currentPassword, user.password);
  // console.log(validPassword);
  if (!validPassword) {
    return next(new AppError("Password is incorrect", 400));
  }
  // Compare newPassword vs confirmPassword
  if (newPassword !== confirmPassword) {
    return next(
      new AppError("Password does not match. Please recheck again!", 400)
    );
  }
  // 3. update the password
  user.password = newPassword;
  //  User.findByIdAndUpdate will not work, never use update for users, because validator will not work with update method
  await user.save();

  // 4. log the user in, send JWT
  createSendToken(user, 200, res);
});
