const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  UnauthenticatedError,
} = require("../../Auth-Workflow/server/errors");

const showMe = async (req, res) => {
//   const user = await User.findOne({ _id: req.user.userId });
//   if (!user) {
//     throw new UnauthenticatedError("Authentication Invalid");
//   }
//   res.status(StatusCodes.OK).json({ user:req.user });
};

module.exports = {
  showMe,
};
