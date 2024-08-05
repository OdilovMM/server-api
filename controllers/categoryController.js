const { CustomAPIError, BadRequestError, NotFoundError } = require("../errors");
const Category = require("../models/categoryModel");
const isAllowedTo = require("../utils/isAllowedTo");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");

const addCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Added new Category", category });
};

const getSingleCategory = async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    throw new NotFoundError("No Category found");
  }
  res.status(StatusCodes.OK).json({ category });
};

const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories });
};

const deleteCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.categoryId });
  if (!category) {
    throw new NotFoundError("No Category found");
  }
  isAllowedTo(req.user, category.user);
  await category.deleteOne();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Category deleted", categoryId: category._id });
};

const uploadCategoryImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("Please, upload image");
  }
  
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please, upload only image");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError("Image should be smaller than 1MB");
  }

  //   create path
  const imagePath = path.join(
    __dirname,
    "../public/category/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/category/${productImage.name}` } });
};

module.exports = {
  addCategory,
  getSingleCategory,
  getAllCategories,
  deleteCategory,
  uploadCategoryImage,
};
