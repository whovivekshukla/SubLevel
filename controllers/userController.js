const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, UnauthenticatedError } = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const showMe = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

const userProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ username: id }).select(
    "name username description location website profileImage isVerified"
  );
  if (!user || !user.isVerified) {
    throw new CustomError.BadRequestError(
      `No User Found with username: @${id}`
    );
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const {
    name,
    email,
    username,
    description,
    website,
    location,
    profileImage,
  } = req.body;

  if (!name || !email || !username) {
    throw new CustomError.BadRequestError(
      "Please provide values for Name, Username and Email."
    );
  }

  const checkUsername = await User.findOne({ username });

  if (checkUsername) {
    if (checkUsername._id == req.user.userId) {
    } else {
      throw new CustomError.BadRequestError(
        "This username is not available, please use a different one."
      );
    }
  }

  const user = await User.findOne({ _id: req.user.userId });
  (user.name = name),
    (user.email = email),
    (user.username = username),
    (user.description = description),
    (user.website = website),
    (user.location = location),
    (user.profileImage = profileImage);

  await user.save();

  const tokenUser = createTokenUser(user);

  await Token.findOneAndDelete({ user: req.user.userId });

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: user });
};

module.exports = {
  showMe,
  userProfile,
  updateUser,
};
