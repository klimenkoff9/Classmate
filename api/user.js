const express = require('express');
const router = express.Router();
const { User } = require('../db/models');


// Route paths are prepended with /api/user/
router.post("/", async (req, res, next) => {
  try {
  const user = User.findOne({
    where: { email: req.body.email}
  })
  } catch (error) {
  
  }
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
