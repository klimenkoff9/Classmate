const express = require('express');
const router = express.Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');


// Route paths are prepended with /api/user/
router.post("/", async (req, res, next) => {
	try {
    let { email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const users = await User.create({
      email: email,
      password: hashedPassword
    })
    User.prototype.validPassword = async function(password) {
      return await bcrypt.compare(password, this.password);
  } 
  console.log(await bcrypt.compare(password, users.password));
    res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Can't read request" });
		next(error);
	}
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
