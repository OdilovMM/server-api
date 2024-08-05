const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { BadRequestError, NotFoundError } = require("../errors");
const isAllowedTo = require("../utils/isAllowedTo");

const paymentApi = async ({ amount, currency }) => {
  const client_secret = "randomstringvalue";
  return { client_secret, amount };
};

const addOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please add tax and shipping fee");
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError("No product found");
    }

    const { name, price, image, _id } = dbProduct;

    const singleItemOrder = {
      quantity: item.quantity,
      name,
      price,
      image,
      product: _id,
    };
    // add item
    orderItems = [...orderItems, singleItemOrder];
    subTotal += item.amount * price;
  }
  const total = tax + shippingFee + subTotal;

  const payForProduct = await paymentApi({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: payForProduct.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.client_secret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
};

const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError("No order found");
  }

  isAllowedTo(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrder = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  const ordersCount = await Order.find({
    user: req.user.userId,
  }).countDocuments();

  res.status(StatusCodes.OK).json({ orders, ordersCount });
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { paymentIntId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError("No order found");
  }

  isAllowedTo(req.user, order.user);

  order.paymentIntId = paymentIntId;
  order.status = "paid";

  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  addOrder,
  updateOrder,
};
