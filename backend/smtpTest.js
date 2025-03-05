const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: "verify@card.aianalysis.group", // Microsoft 365 email
    pass: "1gL5zemXG6gFsv331epx" // Microsoft 365 password (App Password recommended)
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

// Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Failed:", error);
  } else {
    console.log("SMTP Connected Successfully");
  }
});
