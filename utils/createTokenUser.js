const createTokenUser = (user) => {
  return (tokenUser = { name: user.name, userId: user._id, role: user.role });
};

module.exports = createTokenUser;
