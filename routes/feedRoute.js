const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { showFeed } = require("../controllers/feedController");

router.get("/", authenticateUser, showFeed);

module.exports = router;
