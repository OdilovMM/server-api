const mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: String,
      required: [true, "Review must include rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "Review must have title"],
    },
    comment: {
      type: String,
      required: [true, "Review must have comment"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must have a user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must relate to a product"],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
