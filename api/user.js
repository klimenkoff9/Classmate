const express = require('express');
const router = express.Router();
const User = require('../db/models/user');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.finAll({
      attributes: ["id", "email"]
    })
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})


// Export our router, so that it can be imported to construct our api routes
module.exports = router;
