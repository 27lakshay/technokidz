const router = require("express").Router();
const bcrypt = require("bcryptjs");
const teacher = require("../models/teacher");
const student = require("../models/student");
const { registerValidation } = require("../validation");

//registering a new student
router.post("/student", async (req, res) => {
  //validate data before submission
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if student already exists
  const emailExist = await student.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  //hash passwords before submission
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new student
  const user = new student({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.send({ userId: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//registering a new teacher
router.post("/teacher", async (req, res) => {
  //validate data before submission
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if teacher already exists
  const emailExist = await teacher.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  //hash passwords before submission
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new teacher({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.send({ userId: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
