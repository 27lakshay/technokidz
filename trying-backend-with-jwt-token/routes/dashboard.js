const router = require("express").Router();
const auth = require("../middleware/auth");
const Teacher = require("../models/teacher");
const Student = require("../models/student");

//check student login
router.get("/student", auth, async (req, res) => {
  try {
    const user = await Student.findOne({ email: req.currentUser });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//check teacher login
router.get("/teacher", auth, async (req, res) => {
  try {
    const user = await Teacher.findOne({ email: req.currentUser });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
