const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ name, email, verifyToken, origin }) => {
  const verifyEmail = `${origin}/user/email-verify?token=${verifyToken}&email=${email}`;

  const message = `<p>Please verify your email by clicking the link here <a href="${verifyEmail}">Verify Email</a></p>`;
  return sendEmail({
    to: email,
    subject: "Email Verification",
    html: `<h2><a>Hi, ${name}</a></h2>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
