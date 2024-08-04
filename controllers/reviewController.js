const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError, BadRequestError } = require("../errors");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

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

const getAllReviews = (req, res) => {
  res.send("Review Controller");
};

const getSingleReview = (req, res) => {
  res.send("Review Controller");
};

const updateReview = (req, res) => {
  res.send("Review Controller");
};

const deleteReview = (req, res) => {
  res.send("Review Controller");
};

module.exports = {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
