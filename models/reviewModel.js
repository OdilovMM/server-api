const mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
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

reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        avgRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  console.log(result);
  try {
    if (result.length > 0) {
      await this.model("Product").findByIdAndUpdate(
        { _id: productId },
        {
          avgRating: Math.round(result[0]?.avgRating),
          numOfReviews: result[0]?.numOfReviews,
        },
        {
          new: true,
        }
      );
    } else {
      await this.model("Product").findByIdAndUpdate(
        { _id: productId },
        {
          avgRating: 0,
          numOfReviews: 0,
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
  console.log("post save hook triggered");
});

reviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.calculateAverageRating(this.product);
    console.log("post deleteOne hook triggered");
  }
);

module.exports = mongoose.model("Review", reviewSchema);
