const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { verifyMyToken } = require("../utils/jwt");

// only logged users
const isLoggedIn = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("You are not logged in. Please, Log in");
  }

  try {
    const { name, userId, role } = verifyMyToken({ token });
    req.user = { name: name, userId: userId, role: role };
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
