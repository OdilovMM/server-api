const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: `"E-commerce Web Server" <${process.env.SMTP_USER}>`, 
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
