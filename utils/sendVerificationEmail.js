const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/api/v1/auth/verify-email?verificationToken=${verificationToken}&email=${email}`;
  // const message = `<p>Thank you for joining SubLevel! We're excited to have you as part of our community. <br> To complete your registration, please verify your email address by clicking the link below: <br> <br> <a href="${verifyEmail}">${verifyEmail}</a> <br> <br> If you did not request this verification, please ignore this email. Your account will not be created until you verify your email address. <br> Thank you for using SubLevel. <br> Best Regards, <br> The SubLevel Team</p>`;
  const message = `
  <html>
  <head>
    <title>Verify your SubLevel account</title>
  </head>
  <body>
    <p>Dear ${name},</p>
    <p>Thank you for joining SubLevel! We're excited to have you as part of our community.</p>
    <p>To complete your registration, please verify your email address by clicking the link below:</p>
    <p><a href="${verifyEmail}">${verifyEmail}</a></p>
    <p>If you did not request this verification, please ignore this email. Your account will not be created until you verify your email address.</p>
    <p>Thank you for using SubLevel.</p>
    <p>Best regards,</p>
    <p>The SubLevel Team</p>
  </body>
</html>

  
  `;
  return sendEmail({
    to: email,
    subject: "SubLevel Email Confirmation",
    html: `
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
