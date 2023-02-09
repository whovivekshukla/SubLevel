const sendEmail = require("./sendEmail");

const sendResetPassswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/auth/reset-password?token=${token}&email=${email}`;
  // const message = `<p>Please reset password by clicking on the following link : 
  // <a href="${resetURL}">Reset Password</a></p>`;

  const message = `
  <html>
  <head>
    <title>Reset your SubLevel account password</title>
  </head>
  <body>
    <p>Dear ${name},</p>
    <p>We received a request to reset the password for your SubLevel account. If you did not make this request, please ignore this email.</p>
    <p>To reset your password, please click the link below:</p>
    <p><a href="${resetURL}">${resetURL}</a></p>
    <p>Best regards,</p>
    <p>The SubLevel Team</p>
  </body>
</html>

  
  `;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `
   ${message}
   `,
  });
};

module.exports = sendResetPassswordEmail;
