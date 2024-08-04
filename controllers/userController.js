const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookieResponse } = require("../utils/jwt");

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

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError("Please, Enter all fields");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  );
  const tokenUser = createTokenUser(user);
  attachCookieResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please, Enter all fields");
  }
  const user = await User.findOne({ _id: req.user.userId });
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
