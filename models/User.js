const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
