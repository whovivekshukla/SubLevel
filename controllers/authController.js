const User = require("../models/User");
const  CustomAPIError = require("../errors");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  const usernameAlreadyExists = await User.findOne({ username });
  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError(
      "Email Already Exists, Please use another email"
    );
  } else if (usernameAlreadyExists) {
    throw new CustomAPIError.BadRequestError(
      "Username Already Exists, Please use another username"
    );
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    username,
    password,
    verificationToken,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("Login Page");
};

const logout = async (req, res) => {
  res.send("Logout Page");
};

module.exports = {
  register,
  login,
  logout,
};
