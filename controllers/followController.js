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

const myFollowing = async (req, res) => {
  const following = await Follow.find({ user: req.user.userId });
  const followeeIDs = following.map((followee) => followee.followee);
  if (followeeIDs.length === 0) {
    throw new CustomError.BadRequestError("You don't follow anyone");
  }
  const users = await User.find({ _id: followeeIDs }).select(
    "name username description profileImag location website"
  );
  res.status(StatusCodes.OK).json({ users });
};

const myFollowers = async (req, res) => {
  const followers = await Follow.find({ followee: req.user.userId });
  const followerIDs = followers.map((followers) => followers.user);
  if (followerIDs.length === 0) {
    throw new CustomError.BadRequestError("You don't have any follower");
  }
  const users = await User.find({ _id: followerIDs }).select(
    "name username description profileImag location website"
  );
  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  followUser,
  unfollowUser,
  myFollowers,
  myFollowing,
};
