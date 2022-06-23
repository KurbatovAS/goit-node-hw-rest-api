const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "nonamegod@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: "nonamegod@meta.ua" };

  transporter
    .sendMail(email)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
