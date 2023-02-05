const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  followUser,
  unfollowUser,
  myFollowing,
  myFollowers,
} = require("../controllers/followController");

router.get("/following", authenticateUser, myFollowing);
router.get("/followers", authenticateUser, myFollowers);
router.post("/:userID", authenticateUser, followUser);
router.delete("/:userID", authenticateUser, unfollowUser);

module.exports = router;
