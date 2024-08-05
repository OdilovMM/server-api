const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetUrl = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Click to reset your password <a href="${resetUrl}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset password",
    html: `<h2>Hi,${name}</h2>
    ${message}
    `,
  });
};

module.exports = sendResetPasswordEmail;
