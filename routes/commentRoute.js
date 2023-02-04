const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  createComment,
  showComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/:postID", authenticateUser, createComment);
router.get("/:postID", authenticateUser, showComment);
router.patch("/:commentID", authenticateUser, updateComment);
router.delete("/:commentID", authenticateUser, deleteComment);

module.exports = router;
