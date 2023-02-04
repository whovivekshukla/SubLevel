const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  showMe,
  userProfile,
  updateUser,
} = require("../controllers/userController");

router.get("/showMe", authenticateUser, showMe);
router.post("/updateUser", authenticateUser, updateUser);
router.get("/:id", authenticateUser, userProfile);

module.exports = router;
