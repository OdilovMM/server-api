const { CustomAPIError, NotFoundError } = require("../errors");
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
  console.log(req.query);

  const {
    name,
    price,
    rating,
    brand,
    category,
    colors,
    seasonal,
    featured,
    freeShipping,
    skipPage,
    sort,
    fields,
    numberFilters,
  } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (seasonal) {
    queryObject.seasonal = seasonal === "true" ? true : false;
  }
  if (freeShipping) {
    queryObject.freeShipping = freeShipping === "true" ? true : false;
  }
  if (brand) {
    queryObject.brand = brand;
  }
  if (category) {
    queryObject.category = category;
  }
  if (colors) {
    queryObject.colors = colors;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numberFilters) {
    const operationMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regExp = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numberFilters.replace(
      regExp,
      (match) => `-${operationMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.number) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError("No Product found with that ID");
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new NotFoundError("No Product found with that ID");
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete({ _id: productId });

  if (!product) {
    throw new NotFoundError("No Product found with that ID");
  }
  res.status(StatusCodes.OK).json({ msg: "A product deleted" });
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
