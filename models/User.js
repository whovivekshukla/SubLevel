const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    maxLength: 50,
    minLength: 3,
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
    maxLength: 15,
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  description: {
    type: String,
    minLength: 160,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Date,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  accountCreatedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
