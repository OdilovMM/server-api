const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");
const { CustomAPIError } = require("../errors");

const getAllOrders = async (req, res) => {
  res.send("order controller");
};

const getSingleOrder = async (req, res) => {
  res.send("order controller");
};

const getCurrentUserOrder = async (req, res) => {
  res.send("order controller");
};

const addOrder = async (req, res) => {
  res.send("order controller");
};

const updateOrder = async (req, res) => {
  res.send("order controller");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  addOrder,
  updateOrder,
};
