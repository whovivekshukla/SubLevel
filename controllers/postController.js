const User = require("../models/User");
const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const showAllPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const { postData } = req.body;
  if (!postData) {
    throw new CustomError.BadRequestError(
      "Post cannot be empty, please write something."
    );
  }
  const post = await Post.create({ post: postData, user: req.user.userId });
  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const { postID } = req.params;
  const { postData } = req.body;
  if (!postData) {
    throw new CustomError.BadRequestError(
      "Please provide the updated post data."
    );
  }
  const post = await Post.findOne({ _id: postID });
  post.post = postData;
  await post.save();
  res.status(StatusCodes.OK).json({ post });
};

const showPost = async (req, res) => {
  const { id } = req.params;
  //   console.log(postIDparams);
  const post = await Post.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { postID } = req.params;
  const post = await Post.findOneAndDelete({ _id: postID });
  if (!post) {
    throw new CustomError.BadRequestError(`No Post with ID: ${postID}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Post Deleted" });
};

module.exports = {
  showAllPosts,
  createPost,
  showPost,
  updatePost,
  deletePost,
};
