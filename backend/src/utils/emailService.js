const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = {
  send: (to, subject, html) =>
    transporter.sendMail({ from: process.env.MAIL_USER, to, subject, html }),
};
