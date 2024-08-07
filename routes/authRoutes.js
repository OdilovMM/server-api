const express = require("express");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middleware/authenticate");
const router = express.Router();

router.post("/register", register);
router.post("/email-verification", verifyEmail);
router.post("/login", login);
router.delete("/logout", isLoggedIn, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
