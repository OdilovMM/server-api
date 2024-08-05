const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: String,
  },
  {
    timestamps: true,
  }
);

categorySchema.index({
  name: "text",
});

categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
