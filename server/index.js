const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const app = express();

const connectDB = require("./config/DB");

// cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

// function to make connection to mongodb
connectDB();

// server at 3001
app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT}`);
});
