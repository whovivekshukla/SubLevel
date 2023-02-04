const User = require("../models/User");
const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, UnauthenticatedError } = require("../errors");

const showAllPosts = async (req, res) => {
  res.send("Show all Posts");
};

const createPost = async (req, res) => {
  res.send("Create Post");
};

const updatePost = async (req, res) => {
  res.send("Update Post");
};

const showPost = async (req, res) => {
  res.send("Show Single Post");
};

const deletePost = async (req, res) => {
  res.send("Delete Post");
};

module.exports = {
  showAllPosts,
  createPost,
  showPost,
  updatePost,
  deletePost,
};
