const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteMe,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.get("/current-user", showCurrentUser);
router.patch("/update-user", updateUser);
router.patch("/user-password", updateUserPassword);
router.delete("/delete-me", deleteMe);

module.exports = router;
