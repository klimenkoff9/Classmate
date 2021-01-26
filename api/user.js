const express = require('express');
const router = express.Router();
const { User } = require('../db/models');

// Express Routes for Players - Read more on routing at https://expressjs.com/en/guide/routing.html
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    });
		res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
