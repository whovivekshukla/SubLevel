const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
// const emailjs = require('emailjs')

const sendEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // let testAccount = await nodemailer.createTestAccount();
  // const transporter = nodemailer.createTransport(sgMail);

  return sgMail.send({
    from: "<sublevelmail@proton.me>",
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
