const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { like, unLike } = require("../controllers/likeController");

router.post("/:postID", authenticateUser, like);
router.delete("/:postID", authenticateUser, unLike);

module.exports = router;
