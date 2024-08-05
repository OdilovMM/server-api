const express = require("express");
const router = express.Router();
const {
  addCategory,
  getSingleCategory,
  getAllCategories,
  deleteCategory,
  uploadCategoryImage
} = require("../controllers/categoryController");
const { isLoggedIn, allowTo } = require("../middleware/authenticate");

// router.get("/", isLoggedIn, allowTo("admin"), controllerMethod);
router.post("/add-category", isLoggedIn, allowTo("admin"), addCategory);
router.post("/upload", isLoggedIn, allowTo("admin"), uploadCategoryImage);
router.get("/all-categories",  getAllCategories);
router.get("/all-categories/:categoryId",  getSingleCategory);
router.delete("/all-categories/:categoryId",isLoggedIn, allowTo("admin"), deleteCategory);

module.exports = router;
