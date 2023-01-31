const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const sendEmail = require("./sendEmail");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const createHash = require("./createHash");

module.exports = {
  createHash,
  sendEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createTokenUser,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
