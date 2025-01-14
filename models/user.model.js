const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "filed must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.U, userRoles.A, userRoles.M],
    default: userRoles.U,
  },
  avatar: {
    require: false,
    type: String,
    default: "uploads/profile.png",
  },
});

module.exports = mongoose.model("User", userSchema);
