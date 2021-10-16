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

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // console.log(token);

  // remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    // token,
    data: {
      user,
    },
  });
};
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });
  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide your email and password", 400));
  }
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) next(new AppError("Found no user with given email", 404));
  const isValid = await existingUser.correctPassword(
    password,
    existingUser.password
  );

  if (!isValid) {
    next(new AppError("Your email or password is not correct", 400));
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

export const protect = catchAsync(async (req, res, next) => {
  // console.log(req.cookies);
  // console.log(req.headers);
  // 1. getting token
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) next(new AppError("Found no token", 404));
  // 2. validate/ verify token
  const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
  if (!decoded) next(new AppError("invalid token", 400));
  // 3. check user existence
  const existingUser = await User.findById(decoded.id);
  if (!existingUser) next(new AppError("Found no user", 404));
  // 4. check if user changed password after the token is issued

  if (existingUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // grant access to protected routes
  req.user = existingUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // authController.restrictTo("admin")
    // roles = ["admin"]
    // with the User role that does not includes in roles array => Error
    if (!roles.includes(req.user.role)) {
      next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
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
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/resetPassword/${resetToken}`;
    const message = `Please click the link below to enter your new password.\n${resetURL}.\nIf you do not forget password, please ignore this email.`;
    await sendEmail({
      subject: "Forgot Password (valid for 10 mins)",
      email: user.email,
      message,
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
  // console.log(req.body);
  // console.log(req.user);
  const user = await User.findById(req.user.id).select("+password");
  //2. check if the posted password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // console.log(validPassword);
  if (!validPassword) {
    return next(new AppError("Password is incorrect", 400));
  }
  // 3. update the password
  user.password = req.body.newPassword;
  //  User.findByIdAndUpdate will not work, never use update for users, because validator will not work with update method
  await user.save();

  // 4. log the user in, send JWT
  createSendToken(user, 200, res);
});
