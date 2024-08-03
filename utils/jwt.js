const jwt = require("jsonwebtoken");

const createSendToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const verifyMyToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createSendToken,
  verifyMyToken,
};
