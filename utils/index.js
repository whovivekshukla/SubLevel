const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const sendEmail = require("./sendEmail");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createTokenUser,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
