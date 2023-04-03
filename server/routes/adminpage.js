const express = require("express");
const router = express.Router();
const Model = require("../models/Credential");

const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, function (req, res) {
  var userprojection = {
    __v: false,
    password: false,
  };
  Model.find({ roles: "student" }, userprojection, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

module.exports = router;
