const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product name is mandatory"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product price is mandatory"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "A product description is mandatory"],
    },
    image: {
      type: String,
      required: "/uploads/default.jpg",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      required: [true, "A product brand is mandatory"],
      enum: {
        values: [
          "adidas",
          "nike",
          "puma",
          "ikea",
          "bosch",
          "dewalt",
          "samsung",
          "sony",
          "nestle",
          "chocko",
        ],
        message: "{VALUES} is not exist",
      },
    },
    colors: {
      type: [String],
      required: [true, "A product color is mandatory"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    seasonal: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "A product inventory is mandatory"],
      default: 1,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.pre("deleteOne", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", productSchema);
