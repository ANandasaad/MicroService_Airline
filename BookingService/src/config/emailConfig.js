const nodemailer = require("nodemailer");

const sender = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL_ID,
      pass: EMAIL_PASS,
    },
  });
  
  module.exports = sender;