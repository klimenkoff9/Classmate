const express = require('express');
const router = express.Router();
const User = require('../db/models/user');


router.post("/signup", async (req, res, next) => {
  try {
  console.log(req.body);
  const newUser = User.create({
    email: req.body.email,
    password: req.body.password
  })
  // if (!newUser) {
  //     console.log("No user found");
  //     res.status(401).send("User already exists");
  // } else if (req.body.email.includes("@brooklyn.cuny.edu") || req.body.email.includes("@bcmail.cuny.edu")) {
  //   console.log("Not school email");
  //   res.status(401).send("Only available to Brooklyn College students/faculty");
  // } else {
    res.status(200).json(newUser)
    // req.login(user, err => (err ? next(err) : 
  } catch (error) {
    next(error);
  }
});


// Route paths are prepended with /api/user/
router.post("/login", async (req, res, next) => {
  try {
  const user = await User.findOne({
    where: { email: req.body.email }
  })
  console.log(user);
  if (!user) {
      console.log("No user found");
      res.status(401).send("Wrong username or password");
  } else if (!user.correctPassword(req.body.password)) {
    console.log("Incorrect password");
    res.status(401).send("Wrong username or password");
  } else {
    req.login(user, err => (err ? next(err) : res.status(200).json(user))) 
  }

  } catch (error) {
    next(error);
  }
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
