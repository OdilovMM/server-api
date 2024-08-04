const { CustomAPIError } = require("../errors");
const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  res.send("Product controller");
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
