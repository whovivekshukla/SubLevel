const User = require("../models/User");
const Follow = require("../models/Follow");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const followUser = async (req, res) => {
  const { userID } = req.params;
  const checkFollow = await Follow.findOne({
    user: req.user.userId,
    followee: userID,
  });
  if (checkFollow) {
    throw new CustomError.BadRequestError("You already follow this user");
  }
  const follow = await Follow.create({
    user: req.user.userId,
    followee: userID,
  });
  res.status(StatusCodes.CREATED).json({ follow });
};

const unfollowUser = async (req, res) => {
  const { userID } = req.params;
  const checkFollow = await Follow.findOne({
    user: req.user.userId,
    followee: userID,
  });
  if (!checkFollow) {
    throw new CustomError.BadRequestError("You already unfollow this user");
  }
  await Follow.findOneAndDelete({ _id: checkFollow._id });
  res.status(StatusCodes.OK).json({ msg: "User Unfollowed" });
};

module.exports = {
  followUser,
  unfollowUser,
};
