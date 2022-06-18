const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a "transporter" method of nodemailer. Deliver the email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, //email provider
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the mail options
  const emailOptions = {
    from: 'TaniuOp <taniuop@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
    // html: convert the tet to html format
  };
  // Send the emal to user
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
