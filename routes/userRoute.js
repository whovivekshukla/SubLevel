const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const { showMe } = require("../controllers/userController");

router.get("/showMe", authenticateUser, showMe);

module.exports = router;
