const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

const connectDB = () => {
  mongoose
    .connect(mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
