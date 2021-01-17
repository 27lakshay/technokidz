const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    role: {
      type: Number,
      required: true,
      max: 1,
      min: 0,
    },
    isChecked: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("student", studentSchema);

module.exports = User;
