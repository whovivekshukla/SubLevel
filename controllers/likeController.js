const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const like = async (req, res) => {
  const { postID } = req.params;
  const checkLike = await Like.findOne({
    post: postID,
    user: req.user.userId,
  });
  if (checkLike) {
    throw new CustomError.BadRequestError("You have already liked this post.");
  }
  const newLike = await Like.create({
    post: postID,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ newLike });
};

const unLike = async (req, res) => {
  const { postID } = req.params;
  const like = await Like.findOne({ post: postID, user: req.user.userId });
  if (!like) {
    throw new CustomError.NotFoundError("You have not liked this post.");
  }
  await Like.deleteOne({ _id: like._id });
  res.status(StatusCodes.OK).json({ msg: "Like Deleted" });
};

const likeCount = async (req, res) => {
  const { postID } = req.params;
  const count = await Like.find({ post: postID }).count();
  res.status(StatusCodes.OK).json({ count });
};

module.exports = {
  like,
  unLike,
  likeCount,
};
