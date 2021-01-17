const router = require("express").Router();
const express = require("express");
const auth = require("../middleware/auth");
const Teacher = require("../models/teacher");
const Student = require("../models/student");

//add verify to make the route private
router.get("/", auth, (req, res) => {
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

router.get("/students", async (req, res) => {
  // if (req.body.role == 0) {
  const fetchData = await Student.find({}, "name isChecked");
  res.json(fetchData);
  // } else {
  // res.json({ message: "value of role is not 0" });
  // }
});

module.exports = router;
