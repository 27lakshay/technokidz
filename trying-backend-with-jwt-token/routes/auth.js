const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { registerValidation, loginValidation } = require("../validation");

//checklogin
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId }).select("role");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//registering a new user
router.post("/register", async (req, res) => {
  //validate data before submission
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  //hash passwords before submission
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login user
router.post("/login", async (req, res) => {
  //validating the data before user submission
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email doesnt exist");

  //check password is correct or not
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("incorrect password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.json({
    token,
    user: {
      id: user._id,
      role: user.role,
    },
  });
});

module.exports = router;
