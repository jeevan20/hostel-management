const jwt = require("jsonwebtoken");
const User = require("../models/Credential");

const isAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ message: "unauthorized access" });
      } else {
        const existingUser = await User.findById(decodedToken.id);
        if (!existingUser) {
          return res.json("Invalid Admin Credential");
        } else {
          if (existingUser.roles === "Admin") {
            req.user = existingUser;
            next();
          } else if (existingUser.roles === "student") {
            res.json({ message: "student not authorized" });
          }
        }
      }
    });
  } else {
    return res.status(400).json("Please Login or Register");
  }
};
module.exports = isAuth;
