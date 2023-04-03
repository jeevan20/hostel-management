const express = require("express");
const router = express.Router();
const Queries = require("../models/queries");
const isStudent = require("../middleware/isStudent");
const isAdmin = require("../middleware/isAuth");

router.post("/", isStudent, async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      rollno: req.body.rollno,
      roomno: req.body.roomno,
      Complaint: req.body.complaint,
    };

    if (
      user.email === req.user.email &&
      user.rollno === req.user.rollno &&
      user.roomno === req.user.roomno
    ) {
      const querySaved = await Queries.create(user);
      res.json({ message: "query added successfully" });
    } else {
      res.json({ message: "Invalid request, try login" });
    }
  } catch (e) {
    res.json({ message: "try login and query" });
    console.log(e);
  }
});

router.post("/isDone", isAdmin, async (req, res) => {
  try {
    Queries.findOneAndUpdate(
      { email: req.body.to, Complaint: req.body.Complaint },
      {
        $set: {
          isDone: true,
        },
      },
      { new: false },
      (err, data) => {
        if (data) {
          res.json({ message: "Acknowlegment Updated" });
        } else {
          console.log(err);
          res.json({ message: "user not found" });
        }
      }
    );
  } catch (e) {
    res.json({ message: "try login and query" });
    console.log(e);
  }
});

router.get("/", isStudent, async (req, res) => {
  try {
    Queries.find(
      {
        email: req.user.email,
      },
      (err, result) => {
        if (err) {
          res.json({ message: "something went wrong" });
        } else {
          res.json(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
    return res.json({ message: "hUnauthorized access" });
  }
});

module.exports = router;
