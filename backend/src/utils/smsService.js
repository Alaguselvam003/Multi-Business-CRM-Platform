const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  send: (to, body) =>
    client.messages.create({ from: process.env.TWILIO_PHONE, to, body }),
};
