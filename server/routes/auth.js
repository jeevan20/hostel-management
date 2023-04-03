const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Model = require("../models/Credential");
const validateRegisterInput = require("./validation/registerValidation");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Model.findOne({
      email: new RegExp("^" + email + "$", "i"),
    });

    if (existingUser) {
      const dbpassword = existingUser.password;
      const matchPassword = await bcrypt.compare(password, dbpassword);
      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        const saveduser = { ...existingUser._doc }; //coverts collection to js object
        delete saveduser.password;
        const token = createToken(saveduser._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        return res.status(200).json(saveduser);
      }
    } else {
      return res.status(401).json("Invalid Email");
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "something went wrong" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, password, email, rollno, regno, department, roomno } = req.body;
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json("errors");
    }

    const existingUser = await Model.findOne({
      email: new RegExp("^" + email + "$", "i"),
      rollno: new RegExp("^" + req.body.rollno + "$", "i"),
      regno: new RegExp("^" + req.body.regno + "$", "i"),
    });
    if (existingUser) {
      return res.status(400).json({ message: "USER ALREADY EXISTS" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await Model.create({
      name: name,
      password: hashedpassword,
      email: email,
      rollno: rollno,
      regno: regno,
      department: department,
      roomno: roomno,
    });

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    const saveduser = { ...user._doc }; //coverts collection to js object
    delete saveduser.password;
    res.status(201).json(saveduser);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Please enter crt credentials for email,rollno,regno ",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie().json("logout successfully");
});

module.exports = router;
