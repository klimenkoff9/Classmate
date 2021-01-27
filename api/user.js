const express = require('express');
const router = express.Router();
const User = require('../db/models/user');


router.post("/signup", async (req, res, next) => {
  try {
  if (req.body.email === "" || req.body.email === null) {
    
  } else if (!req.body.email.includes("@brooklyn.cuny.edu") && !req.body.email.includes("@bcmail.cuny.edu")) {
    console.log(req.body.email);
    res.status(401).send("Only available to Brooklyn College students/faculty");
  } else {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json(newUser)
  }

  } catch (error) {
    res.status(401).send(error.name);
  }
});


// Route paths are prepended with /api/user/
router.post("/login", async (req, res, next) => {
  try {
  const user = await User.findOne({
    where: { email: req.body.email }
  })
  
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
