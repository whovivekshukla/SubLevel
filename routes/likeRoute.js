const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { like, unLike, likeCount } = require("../controllers/likeController");

router.post("/:postID", authenticateUser, like);
router.delete("/:postID", authenticateUser, unLike);
router.get("/:postID", authenticateUser, likeCount);

module.exports = router;
