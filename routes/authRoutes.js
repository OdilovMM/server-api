const express = require("express");
const {
  register,
  login,
  logout,
  verifyEmail,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/email-verification", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
