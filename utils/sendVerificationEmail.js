const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/api/v1/auth/verify-email?verificationToken=${verificationToken}&email=${email}`;
  const message = `<p>Welcome to SubLevel, Please click on the following link to verify your account: <a href="${verifyEmail}">Verify Email</a>.</p>`;

  return sendEmail({
    to: email,
    subject: "SubLevel Email Confirmation",
    html: `<h4> Hello ${name} </h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
