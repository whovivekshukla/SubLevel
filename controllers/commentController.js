const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  const { postID } = req.params;
  const { commentData } = req.body;
  const comment = await Comment.create({
    user: req.user.userId,
    post: postID,
    comment: commentData,
  });
  res.status(StatusCodes.CREATED).json({ comment });
};

const updateComment = async (req, res) => {
  const { commentID } = req.params;
  const { commentData } = req.body;
  const comment = await Comment.findOne({ _id: commentID });
  if (!comment) {
    throw new CustomError.NotFoundError(
      `No Comment Found with ID: ${commentID}`
    );
  }
  comment.comment = commentData;
  await comment.save();
  res.status(StatusCodes.OK).json({ comment });
};

const showComment = async (req, res) => {
  const { postID } = req.params;
  const comment = await Comment.find({ post: postID, user: req.user.userId });
  res.status(StatusCodes.OK).json({ comment });
};

const deleteComment = async (req, res) => {
  const { commentID } = req.params;
  const comment = await Comment.findOne({ _id: commentID });
  if (!comment) {
    throw new CustomError.NotFoundError(
      `No Comment exists with ID: ${commentID}`
    );
  }

  await Comment.findOneAndDelete({ _id: comment._id });
  res.status(StatusCodes.OK).json({ msg: "Comment Deleted" });
};

module.exports = {
  createComment,
  showComment,
  updateComment,
  deleteComment,
};
