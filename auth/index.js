const express = require('express');
const router = express.Router();
const User = require('../db/models/user');

router.post("/signup", async (req, res, next) => {
    try {
      console.log(req.body);
    if (req.body.email === "" || req.body.email === null) {
      console.log(req.body.email);
      res.status(200).send("Invalid email format");
    } else if (!req.body.email.includes("@brooklyn.cuny.edu") && !req.body.email.includes("@bcmail.cuny.edu")) {
      console.log(req.body.email);
      res.status(200).send("You have to register with Brooklyn College email address");
    } else if (req.body.password !== req.body.passwordConfirm) {
      console.log("No match");
      res.status(200).send("Passwords don't match");
    } else {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password
      })
      req.login(user, err => (err ? next(err) : res.status(200).json(user)))
    }
  
    } catch (error) {
      console.log(error);
      res.status(200).send("User already exists!");
  
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
        res.status(200).send("Wrong username or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password");
      res.status(200).send("Wrong username or password");
    } else {
      req.login(user, err => (err ? next(err) : res.status(200).json(user)))
      console.log("Login success");
    }
    } catch (error) {
      next(error);
      console.log(error);
    }
  });
  
  router.get("/me", async (req, res, next) => {
    res.json(req.user);
  })
  
  router.post("/logout", async (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
    res.status(200);
  })
  
  module.exports = router;