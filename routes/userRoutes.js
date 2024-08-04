const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteMe,
} = require("../controllers/userController");
const { isLoggedIn, allowTo } = require("../middleware/authenticate");
const router = express.Router();

router.get("/", isLoggedIn, allowTo("admin"), getAllUsers);
router.get("/:id", getSingleUser);
router.get("/current-user", showCurrentUser);
router.patch("/update-user", updateUser);
router.patch("/user-password", updateUserPassword);
router.delete("/delete-me", deleteMe);

module.exports = router;
