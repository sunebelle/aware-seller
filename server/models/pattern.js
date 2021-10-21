import mongoose from "mongoose";

const patternSchema = mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Pattern = mongoose.model("Pattern", patternSchema);

export default Pattern;
