const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updatePassword,
  deleteMe,
  showMe,
} = require("../controllers/userController");
const { isLoggedIn, allowTo } = require("../middleware/authenticate");

router.get("/", isLoggedIn, allowTo("admin"), getAllUsers);
router.get("/current-user", isLoggedIn, showMe);
router.patch("/update-password", isLoggedIn, updatePassword);
router.patch("/update-user", updateUser);
router.get("/:id", getSingleUser);
router.delete("/delete-me", deleteMe);

module.exports = router;
