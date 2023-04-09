const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
  secure: true,
});
router.post("/:id", isAuth, async (req, res) => {
  const { to } = req.body;

  const mailData = {
    from: "candybody922003@gmail.com", // sender address
    to: to,
    subject: "Query Accepted",
    text: "We accepted your Query it will be solved within a week",
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else res.send({ message: "Mail sent successfully " });
  });
});

module.exports = router;
