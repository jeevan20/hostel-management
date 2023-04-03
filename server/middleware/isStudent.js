const jwt = require("jsonwebtoken");
const User = require("../models/Credential");
const isStudent = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ message: "unauthorized access" });
      } else {
        const existingUser = await User.findById(decodedToken.id);
        if (existingUser.roles === "student") {
          req.user = existingUser;
          next();
        } else if (existingUser.roles === "Admin") {
          res.json({ message: "admin cannot access this page" });
        }
      }
    });
  } else {
    return res.status(401).json({ message: "unauthorized access" });
  }
};
module.exports = isStudent;
