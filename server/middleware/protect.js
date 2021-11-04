import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = catchAsync(async (req, res, next) => {
  // console.log(`The query took ${req.requestTime} `);
  // console.log(req.cookies);
  // console.log(req.headers);
  // 1. getting token
  let token;
  //interceptor in the FE with axios by setting headers.authorization
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // console.log("protect route", token);
  if (!token) {
    return next(new AppError("Found no token", 404));
  }
  // 2. validate/ verify token
  const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

  if (!decoded) {
    return next(new AppError("invalid token", 400));
  }
  // 3. check user existence
  const existingUser = await User.findById(decoded.id);
  if (!existingUser) {
    return next(new AppError("Found no user", 404));
  }
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
    // restrictTo("admin", "seller")
    // roles = ("admin", "user", "seller")
    // with the User role that does not includes in roles array => Error
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
