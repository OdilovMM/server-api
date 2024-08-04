const {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  const userCounts = await User.find({ role: "user" }).countDocuments();
  res.status(StatusCodes.OK).json({ users, userCounts });
};

const getSingleUser = async (req, res) => {
  const user = await User.findById({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError("There is no user with that id");
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.send("userController");
};

const updateUser = async (req, res) => {
  res.send("userController");
};

const updateUserPassword = async (req, res) => {
  res.send("userController");
};

const deleteMe = async (req, res) => {
  res.send("userController");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteMe,
};
