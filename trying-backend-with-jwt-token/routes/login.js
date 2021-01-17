const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const auth = require("../middleware/auth");
const { loginValidation } = require("../validation");

//login user
router.post("/", async (req, res) => {
  //validating the data before user submission
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the email exists
  const determineUser = ({ role }) => {
    if (role == 0) {
      return Teacher;
    } else if (role == 1) {
      return Student;
    }
  };
  const user = await determineUser(req.body).findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Email does not exist");

  //check password is correct or not
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect password");

  //create and assign a token
  const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
    expiresIn: "12h",
  });
  res.json({
    token,
    userDetails: {
      userId: user._id,
    },
  });
});

module.exports = router;
