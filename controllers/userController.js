const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, UnauthenticatedError } = require("../errors");

const showMe = async (req, res) => {
  res.send(req.signedCookies.refreshToken);
};

module.exports = {
  showMe,
};
