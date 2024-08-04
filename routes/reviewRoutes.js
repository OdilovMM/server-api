const express = require("express");
const router = express.Router();
const { isLoggedIn, allowTo } = require("../middleware/authenticate");
const {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", isLoggedIn, allowTo("user"), addReview);
router.get("/all-reviews", getAllReviews);
router.get("/all-reviews/:reviewId", getSingleReview);
router.patch("/all-reviews/:reviewId", updateReview);
router.delete("/all-reviews/:reviewId", deleteReview);

module.exports = router;
