const { BadRequestError, CustomAPIError } = require("../errors");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const { createSendToken, verifyMyToken } = require("../utils/jwt");

const register = async (req, res) => {
  const { email, name, mobile, password } = req.body;

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new CustomAPIError.BadRequestError("Email already in use");
  }

  if (!email || !name || !mobile || !password) {
    throw new CustomAPIError.BadRequestError("Please, provide all credentials");
  }

  const user = await User.create({
    name,
    email,
    password,
    mobile,
  });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createSendToken({ payload: tokenUser });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", user: tokenUser, token });
};

const login = async (req, res) => {
  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
