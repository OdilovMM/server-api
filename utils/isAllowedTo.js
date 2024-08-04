const { CustomAPIError, UnauthenticatedError } = require("../errors");

const isAllowedTo = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthenticatedError(
    "You are not authorized to perform this action"
  );
};

module.exports = isAllowedTo;
