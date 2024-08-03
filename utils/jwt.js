const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createSendToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const verifyMyToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookieResponse = ({ res, user }) => {
  const token = createSendToken({ payload: user });
  res.cookie("token", token, {
    httpOnly: true,
    expires: process.env.JWT_COOKIE_EXPIRES_IN,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createSendToken,
  verifyMyToken,
  attachCookieResponse,
};
