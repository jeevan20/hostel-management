const mongoose = require("mongoose");

const queries = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    rollno: {
      required: true,
      type: Number,
    },
    roomno: {
      required: true,
      type: String,
    },
    Complaint: {
      required: true,
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("queries", queries);
