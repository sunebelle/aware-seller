import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
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
    minLength: 7,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    // select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  //only run this function if password was modified actually (create or update password field)
  // whenever the password field has been modified, need to hash it before storing it in mongo.

  if (!this.isModified("password")) return next();
  // hash password 12 salts
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

//https://mongoosejs.com/docs/api.html#document_Document-isModified
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  loginPassword,
  userPassword
) {
  return await bcrypt.compare(loginPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // password change after jwt issued
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// search for hash.digest at https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
userSchema.methods.createPasswordResetToken = function () {
  // create a random string
  const resetToken = crypto.randomBytes(32).toString("hex");

  // encrypted password reset token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //reset token valid for 10 mins
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // console.log(resetToken, this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
