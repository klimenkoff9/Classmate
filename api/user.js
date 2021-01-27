const express = require('express');
const router = express.Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');


// Route paths are prepended with /api/user/
router.post("/", async (req, res, next) => {
	try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    res.status(200).json(hashedPassword);
    console.log(req.body.password);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Can't read request" });
		next(error);
	}
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
