const mongoose = require("mongoose");
require("mongoose-type-email");
const nodue = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  rollno: {
    type: String,
    required: true,
  },
  roomno: {
    required: true,
    type: String,
  },
  fineamount: {
    required: true,
    type: String,
  },
  duedate: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("nodue", nodue);
