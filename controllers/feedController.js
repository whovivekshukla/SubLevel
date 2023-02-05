const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Follow = require("../models/Follow");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const showFeed = async (req, res) => {
  const myFollowees = await Follow.find({ user: req.user.userId });

  const followeeIds = myFollowees.map((followee) => followee.followee);
  if (followeeIds.length === 0) {
    throw new CustomError.NotFoundError(
      "You don't follow any user, please follow people to see them in your feed"
    );
  }
  const posts = await Post.find({ user: { $in: followeeIds } });
  res.status(StatusCodes.OK).json({ posts });
};

module.exports = {
  showFeed,
};
