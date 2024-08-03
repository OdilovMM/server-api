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
  const daysToExpire = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10);
  const expires = new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000);

  const token = createSendToken({ payload: user });
  res.cookie("token", token, {
    httpOnly: true,
    expires: expires,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createSendToken,
  verifyMyToken,
  attachCookieResponse,
};
