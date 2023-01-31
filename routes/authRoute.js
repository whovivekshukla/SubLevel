const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  verifyPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout, authenticateUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password", verifyPassword);

module.exports = router;
