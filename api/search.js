const express = require('express');
const router = express.Router();
const Search = require('../db/models/search');

// api/search/class
router.get("/class/:className/:classNumber", async (req, res, next) => {

	try {
        const classes = await Search.findAll({where: { className: req.params.className, classNumber: req.params.classNumber }});
       res.status(200).json(classes);
	} catch (error) {
		res.status(500).json({ message: "An error occured" });
		next(error);
	}
});

// router.get("/byfaculty", async (req, res, next) => {
// 	try {
// 		const allStudents = await Search.findAll({where: { facultyName: req.body.facultyName }});
// 		res.status(200).send("Hello World");
// 	} catch (error) {
// 		res.status(500).json({ message: "An error occured" });
// 		next(error);
// 	}
// });

module.exports = router;