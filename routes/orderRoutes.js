const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  addOrder,
  updateOrder,
} = require("../controllers/orderController");
const { isLoggedIn, allowTo } = require("../middleware/authenticate");

// router.get("/", isLoggedIn, allowTo("admin"), controllerMethod);
router.post("/add-order", isLoggedIn, allowTo("user"), addOrder);
router.post("/my-current-orders", isLoggedIn, allowTo("user"), getCurrentUserOrder);
router.get("/all-orders", isLoggedIn, allowTo("admin"), getAllOrders);
router.get("/all-orders/:orderId", isLoggedIn, allowTo("admin", "user"), getSingleOrder);
router.patch("/all-orders/:orderId", isLoggedIn, allowTo("admin", "user"), updateOrder);

module.exports = router;
