import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please give a valid email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    required: [true, "Please create a password"],
    minLength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  //   passwordChangedAt: Date,
  //   passwordResetToken: String,
  //   passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  //only run this function if password is modified actually
  if (!this.isModified("password")) return next();

  // hash password 12 salts
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  loginPassword,
  userPassword
) {
  return await bcrypt.compare(loginPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
