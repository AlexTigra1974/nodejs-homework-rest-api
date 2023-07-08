const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "viitenko.lesia.v@gmail.com" };
  await sgMail.send(email);
  // .then(() => console.log("email verification successful"))
  // .catch((error) => console.log(error));
  return true;
};

module.exports = sendEmail;
