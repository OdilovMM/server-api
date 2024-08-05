const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { verifyMyToken, attachCookieResponse } = require("../utils/jwt");
const Token = require("../models/tokenModel");

// only logged users
const isLoggedIn = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = verifyMyToken(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = verifyMyToken(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError("Authentication failed");
    }
    attachCookieResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    res.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("You are not logged in. Please, Log in");
  }
};

// Role based authorization
const allowTo = (...roles) => {
  console.log("Role based:::", roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthenticatedError(
        `As a ${req.user.role.toUpperCase()}, You are not authorized to do this action, only ${roles} is allowed`
      );
    }
    next();
  };
};

module.exports = { isLoggedIn, allowTo };
