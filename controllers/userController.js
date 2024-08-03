const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  res.send("userController");
};

const getSingleUser = async (req, res) => {
  res.send("userController");
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
