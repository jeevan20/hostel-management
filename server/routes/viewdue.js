const express = require("express");
const router = express.Router();
const nodue = require("../models/nodedue");
const User = require("../models/Credential");
const isStudent = require("../middleware/isStudent");

router.get("/:id", isStudent, async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await User.findById({ _id: user_id });
    if (
      user.email === req.user.email &&
      user.rollno === req.user.rollno &&
      user.roomno === req.user.roomno
    ) {
      await nodue
        .find({
          email: new RegExp("^" + req.user.email + "$", "i"),
        })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return res
        .status(403)
        .json({ message: "user not allowed unauthorized credential " });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "invalid user " });
  }
});

module.exports = router;
