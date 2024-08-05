const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError, BadRequestError } = require("../errors");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const isAllowedTo = require("../utils/isAllowedTo");

const addReview = async (req, res) => {
  const { product: productId } = req.body;
  const isExistProduct = await Product.findOne({ _id: productId });

  if (!isExistProduct) {
    throw new NotFoundError("No product found with that id");
  }
  const isExistReview = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (isExistReview) {
    throw new BadRequestError(
      "You have already added a review, A user can only add one review for a product"
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "A Review added", review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name brand price rating",
    })
    .populate({
      path: "user",
      select: "name",
    });
  const countReviews = await Review.find({}).countDocuments();
  res.status(StatusCodes.OK).json({ reviews, countReviews });
};

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.reviewId });
  if (!review) {
    throw new NotFoundError("No review found with that id");
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: req.params.reviewId });

  if (!review) {
    throw new NotFoundError(
      "Unauthorized! You can't delete someone else's review"
    );
  }

  isAllowedTo(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({ msg: "Review updated", review });
};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.reviewId });
  if (!review) {
    throw new NotFoundError(
      "Unauthorized! You can't delete someone else's review"
    );
  }
  isAllowedTo(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Review deleted" });
};


module.exports = {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
