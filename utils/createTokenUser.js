const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    email: user.email,
    username: user.username,
  };
};

module.exports = createTokenUser;
