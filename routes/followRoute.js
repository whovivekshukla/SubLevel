const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { followUser, unfollowUser } = require("../controllers/followController");

router.post("/:userID", authenticateUser, followUser);
router.delete("/:userID", authenticateUser, unfollowUser);

module.exports = router
