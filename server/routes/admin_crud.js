const express = require("express");
const router = express.Router();
const User = require("../models/Credential");
const bcrypt = require("bcrypt");

const validateRegisterInput = require("./validation/registerValidation");
const isAuth = require("../middleware/isAuth");

// route -- post http://localhost:3001/studentcrud
// desc -- add student
router.post("/", isAuth, async (req, res) => {
  const { name, password, email, rollno, regno, department, roomno } = req.body;
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const existingUser = await User.findOne({
      email: new RegExp("^" + email + "$", "i"),
      rollno: new RegExp("^" + req.body.rollno + "$", "i"),
      regno: new RegExp("^" + req.body.regno + "$", "i"),
    });
    if (existingUser) {
      return res.status(400).json({ message: "USER ALREADY EXISTS" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      password: hashedpassword,
      email: email,
      rollno: rollno,
      regno: regno,
      department: department,
      roomno: roomno,
    });

    res.json({ message: "user added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "email regno rollno must be unique" });
  }
});

// route -- put http://localhost:3001/studentcrud/:id
// desc -- update student

router.put("/:id", isAuth, async (req, res) => {
  const user_id = req.params.id;
  const { names, password, email, rollno, regno, department, roomno } =
    req.body;
  if (password !== "") {
    const hashedpassword = await bcrypt.hash(password, 10);

    User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          name: names,
          password: hashedpassword,
          email: email,
          rollno: rollno,
          regno: regno,
          department: department,
          roomno: roomno,
        },
      },
      { new: false },
      (err, data) => {
        if (data) {
          res.json({ message: "user modified successfully" });
        } else {
          res
            .status(400)
            .json({ message: "Please enter Crt email,roll no ,reg no" });
        }
      }
    );
  } else {
    User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          name: names,

          email: email,
          rollno: rollno,
          regno: regno,
          department: department,
          roomno: roomno,
        },
      },
      { new: false },
      (err, data) => {
        if (data) {
          res.json({ message: "user modified successfully" });
        } else {
          res
            .status(400)
            .json({ message: "Please enter Crt email,roll no ,reg no" });
        }
      }
    );
  }
});

// route -- delete http://localhost:3001/studentcrud/:id
// desc -- delete student
router.delete("/:id", isAuth, async (req, res) => {
  try {
    const user_id = req.params.id;
    const existingUser = await User.findById({ _id: user_id });
    if (existingUser) {
      User.findByIdAndDelete(user_id, function (err, docs) {
        if (!err) {
          res.json({ message: "user deleted" });
        } else {
          console.log(err);
          res.status(404).json({ message: "user not found" });
        }
      });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = router;
