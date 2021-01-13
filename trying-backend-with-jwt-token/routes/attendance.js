const router = require("express").Router();
const express = require("express");
const verify = require("./verifyToken");
const users = require("../models/user");

//add verify to make the route private
router.get("/", verify, (req, res) => {
  if (req.body.role == 0) {
    res.json({
      posts: {
        title: "teacher",
      },
    });
  }
  if (req.body.role == 1) {
    res.json({
      posts: {
        title: "student",
      },
    });
  }
});

router.post("/students", async (req, res) => {
  console.log(req.body.role);
  if (req.body.role == 0) {
    const fetchData = await users.find({ role: "1" }).select("name");
    res.json(fetchData);
  } else {
    res.json({ message: "value of role is not 0" });
  }
});

module.exports = router;
