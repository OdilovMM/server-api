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

const updateUser = async (req, res) => {};

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.user);

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please, Enter all fields");
  }
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);

  const isMatchPassword = await user.comparePassword(oldPassword);
  if (!isMatchPassword) {
    throw new BadRequestError("Please, Enter correct old password");
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password updated" });
};

const deleteMe = async (req, res) => {};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updatePassword,
  deleteMe,
  showMe,
};
