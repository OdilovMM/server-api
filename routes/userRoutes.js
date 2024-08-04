const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  deleteMe,
  showMe,
} = require("../controllers/userController");
const { isLoggedIn, allowTo } = require("../middleware/authenticate");

router.get("/", isLoggedIn, allowTo("admin"), getAllUsers);
router.get("/current-user",isLoggedIn, showMe);
router.get("/:id", getSingleUser);
router.patch("/update-user", updateUser);
router.patch("/user-password", updateUserPassword);
router.delete("/delete-me", deleteMe);

module.exports = router;
