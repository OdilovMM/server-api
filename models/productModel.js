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
      type: String,
      required: [true, "A product category is mandatory"],
      enum: [
        "office",
        "kitchen",
        "bed",
        "gardening",
        "sports",
        "holiday",
        "school",
        "summer",
        "working",
        "leisure",
      ],
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
