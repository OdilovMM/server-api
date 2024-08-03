const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const { attachCookieResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { email, name, mobile, password } = req.body;

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new BadRequestError("Email already in use");
  }

  if (!email || !name || !mobile || !password) {
    throw new BadRequestError("Please, provide all credentials");
  }

  const user = await User.create({
    name,
    email,
    password,
    mobile,
  });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookieResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ status: "success", user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("There is no user related to this email");
  }
  const isMatchPassword = await user.comparePassword(password);

  if (!isMatchPassword) {
    throw new UnauthenticatedError("Incorrect password");
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookieResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ status: "success", user: tokenUser });
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
