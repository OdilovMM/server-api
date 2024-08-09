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
    brand: {
      type: String,
      required: [true, "A product brand is mandatory"],
      enum: {
        values: [
          "Kimball International",
          "ikea",
          "La-Z-Boy",
          "ikea",
          "Haworth",
          "Knoll",
          "Ashley Furniture Industries",
          "Vanguard Furniture",
          "Herman Miller",
          "Steelcase",
        ],
        message: "{VALUES} is not exist",
      },
    },
    category: {
      type: String,
      required: [true, "A product category is mandatory"],
      enum: {
        values: [
          "bedroom",
          "kitchen",
          "gardening",
          "outside",
          "gym",
          "sport",
          "office",
          "working",
          "supermarket",
          "holiday",
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



productSchema.pre("deleteOne",{ document: true, query: false }, async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", productSchema);
