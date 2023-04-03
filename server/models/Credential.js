const mongoose = require("mongoose");

const signup = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  roles: {
    type: String,
    default: "student",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollno: {
    type: String,
    required: true,
    unique: true,
  },
  regno: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  roomno: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Credential", signup);
