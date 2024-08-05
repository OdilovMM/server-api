const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createSendToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyMyToken = ( token ) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookieResponse = ({ res, user, refreshToken }) => {
  const accessTokenExpiresIn = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN, 10); // In minutes
  const refreshTokenExpiresIn = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10); // In days

  const accessTokenExpires = new Date(Date.now() + accessTokenExpiresIn * 60 * 1000); // Convert minutes to milliseconds
  const refreshTokenExpires = new Date(Date.now() + refreshTokenExpiresIn * 24 * 60 * 60 * 1000); // Convert days to milliseconds


  const accessToken = createSendToken({ payload: { user } });
  const refreshTokenJWT = createSendToken({ payload: { user, refreshToken } });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    expires: accessTokenExpires,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    expires: refreshTokenExpires,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

// const attachSingleCookieResponse = ({ res, user }) => {
//   const daysToExpire = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10);
//   const expires = new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000);

//   const token = createSendToken({ payload: user });
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: expires,
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
// };

module.exports = {
  createSendToken,
  verifyMyToken,
  attachCookieResponse,
};
