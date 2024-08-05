const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { StatusCodes } = require("http-status-codes");
const { attachCookieResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const register = async (req, res) => {
  const { email, name, mobile, password } = req.body;

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new BadRequestError("Email already in use");
  }

  if (!email || !name || !mobile || !password) {
    throw new BadRequestError("Please, provide all credentials");
  }

  const verifyToken = crypto.randomBytes(30).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    mobile,
    verifyToken,
  });

  const originLink = "http://localhost:3000"; // it front end host

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verifyToken: user.verifyToken,
    origin: originLink,
  });
  // send verify token
  res.status(StatusCodes.CREATED).json({
    msg: "Success, Check your email to verify",
    verificationToken: user.verifyToken,
  });
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

  if (!user.isVerified) {
    throw new UnauthenticatedError("Please, Complete email verification!");
  }
  const tokenUser = createTokenUser(user);

  let refreshToken = "";

  const existToken = await Token.findOne({ user: user._id });

  if (existToken) {
    const { isValid } = existToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid credentials!");
    }
    refreshToken = existToken.refreshToken;
    attachCookieResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ status: "success", user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookieResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ status: "success", user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ message: "Logging out" });
};

const verifyEmail = async (req, res) => {
  const { verifyToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Failed to verify email");
  }

  if (user.verifyToken !== verifyToken) {
    throw new UnauthenticatedError("Failed to verify email");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verifyToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verification successful" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
