const express = require("express");
const router = express.Router();
const Fine = require("../models/nodedue");
const Model = require("../models/Credential");

const isAuth = require("../middleware/isAuth");
router.post("/", isAuth, async (req, res) => {
  const fineReq = {
    name: req.body.name,
    email: req.body.email,
    rollno: req.body.rollno,
    roomno: req.body.roomno,
    fineamount: req.body.fineamount,
    duedate: req.body.duedate,
  };
  try {
    // Check If Student exist
    const existingUser = await Model.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
      rollno: new RegExp("^" + req.body.rollno + "$", "i"),
    });
    if (existingUser) {
      const fine = await Fine.create(fineReq);
      res.json(fine);
    } else {
      return res.status(400).json({ message: "invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Invalid Credentials" });
  }
});
router.get("/", isAuth, async (req, res) => {
  try {
    Fine.find({}, (err, result) => {
      if (err) {
        res.json({ message: "something went wrong" });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Invalid Credentials" });
  }
});

module.exports = router;
