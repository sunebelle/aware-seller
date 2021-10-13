import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
import User from "./models/user.js";
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
    message: "Change password successfully",
    token,
    data: {
      user,
    },
  });
};
export const register = (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });
  createSendToken(newUser, 201, res);
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide your email and password");
  }
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) throw new Error("Found no user with given email");
  const isValid = await existingUser.correctPassword(
    password,
    existingUser.password
  );

  if (!isValid) {
    throw new Error("Your email or password is not correct");
  }
  createSendToken(existingUser, 200, res);
};
