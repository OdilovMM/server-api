const { CustomAPIError } = require("../errors");
const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");

const addProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const newProduct = await Product.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "A new Product added", newProduct });
};

const getAllProducts = async (req, res) => {
  res.send("Product controller");
};

const getSingleProduct = async (req, res) => {
  res.send("Product controller");
};

const updateProduct = async (req, res) => {
  res.send("Product controller");
};

const deleteProduct = async (req, res) => {
  res.send("Product controller");
};

const uploadProductImage = async (req, res) => {
  res.send("Product controller");
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
};
