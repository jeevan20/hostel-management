const router = require("express").Router();
const User = require("../models/Credential");
const bcrypt = require("bcrypt");

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
      if (user) {
        const userToreturn = { ...user._doc };
        delete userToreturn.password;

        res.status(200).json(userToreturn);
      } else {
        return res.status(401).json("Invalid User");
      }
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

router.post("/password/:id", isStudent, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user_id = req.params.id;
    const user = await User.findById({ _id: user_id });
    if (
      user.email === req.user.email &&
      user.rollno === req.user.rollno &&
      user.roomno === req.user.roomno
    ) {
      const dbpassword = user.password;
      const matchPassword = await bcrypt.compare(oldPassword, dbpassword);
      if (!matchPassword) {
        return res.status(403).json({ message: "Wrong Password" });
      } else {
        const checkpass = await bcrypt.compare(newPassword, dbpassword);
        if (checkpass) {
          return res.status(403).json({ message: "Please enter new Password" });
        } else {
          const hashedpassword = await bcrypt.hash(newPassword, 10);
          User.findByIdAndUpdate(
            user_id,
            {
              $set: {
                password: hashedpassword,
              },
            },
            { new: false },
            (err, data) => {
              if (data) {
                res.json({ message: "Password Changed successfully" });
              } else {
                console.log(err);
                res.json({ message: "user not found" });
              }
            }
          );
        }
      }
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
