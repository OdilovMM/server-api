const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require("../controllers/productController");
const { isLoggedIn, allowTo } = require("../middleware/authenticate");

// router.get("/", isLoggedIn, allowTo("admin"), controllerMethod);
router.post("/add-product", isLoggedIn, allowTo("admin"), addProduct);
router.get("/all-products", getAllProducts);
router.post("/product-image",isLoggedIn, allowTo("admin"), uploadProductImage);
router.get("/all-products/:productId", getSingleProduct);
router.patch("/all-products/:productId",isLoggedIn, allowTo("admin"), updateProduct);
router.delete("/all-products/:productId",isLoggedIn, allowTo("admin"), deleteProduct);

module.exports = router;
