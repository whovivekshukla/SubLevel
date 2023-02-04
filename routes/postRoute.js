const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  showAllPosts,
  createPost,
  showPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { create, update } = require("../models/Post");

router.get("/", authenticateUser, showAllPosts);
router.post("/createPost", authenticateUser, createPost);
router.get("/:id", authenticateUser, showPost);
router.patch("/:id", authenticateUser, updatePost);
router.delete("/:id", authenticateUser, deletePost);

module.exports = router;
