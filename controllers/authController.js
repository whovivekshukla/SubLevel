const User = require("../models/User");
const Token = require("../models/Token");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Follow = require("../models/Follow");
const CustomAPIError = require("../errors");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const {
  createHash,
  attachCookiesToResponse,
  isTokenValid,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils");

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

  const origin = process.env.ORIGIN;

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Congrats, Your account has been created on SubLevel, Please ckeck your email to verify the account.",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.query;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError.BadRequestError("Verification Invalid");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomAPIError.BadRequestError("Verification Failed");
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Account Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError.NotFoundError(
      "Please provide valid Email and Password"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError.NotFoundError(
      "Authentication Failed -  Invalid Credentials"
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError(
      "Authentication Failed - Wrong Password"
    );
  }

  if (!user.isVerified) {
    throw new CustomAPIError.UnauthenticatedError(
      "Authentication Failed - Account not Verified"
    );
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      await Token.findOneAndDelete({ user: req.user.userId });
      throw new CustomAPIError.UnauthenticatedError("Invalid Credentials");
    }

    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomAPIError.BadRequestError("Please provide a valid email.");
  }

  const user = await User.findOne({ email });
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const origin = process.env.ORIGIN;

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for verification" });
};

const verifyPassword = async (req, res) => {
  const { token, email } = req.query;
  const { password } = req.body;

  if (!token || !email || !password) {
    throw new CustomAPIError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    } else {
      throw new CustomAPIError.BadRequestError("Password Change Invalid");
    }
  }
  res.status(StatusCodes.OK).json({ msg: "Your password has been updated" });
};

const deleteAccount = async (req, res) => {
  const { sure } = req.body;
  if (!sure || sure !== "yes") {
    throw new CustomAPIError.BadRequestError(
      "We won't delete your account. You are safe."
    );
  }

  await Post.deleteMany({ user: req.user.userId });
  await Comment.deleteMany({ user: req.user.userId });
  await Like.deleteMany({ user: req.user.userId });
  await Follow.deleteMany({ user: req.user.userId });
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  await User.findOneAndDelete({ _id: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ msg: "We are sorry to see you go, your account has been deleted" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  verifyPassword,
  deleteAccount,
};
