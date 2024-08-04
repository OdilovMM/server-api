const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");
const Review = require("../models/reviewModel");

const addReview = (req, res) => {
  res.send("Review Controller");
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
