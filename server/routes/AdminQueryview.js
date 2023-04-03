const express = require("express");
const router = express.Router();

const Queries = require("../models/queries");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, async (req, res) => {
  try {
    Queries.find({}, (err, result) => {
      if (err) {
        res.json({ message: "something went wrong" });
      } else {
        res.json(result);
      }
    });
  } catch (e) {
    return res.json({ message: "Unauthorized access" });
  }
});

module.exports = router;
