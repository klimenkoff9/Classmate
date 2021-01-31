const express = require('express');
const router = express.Router();
const File = require('../db/models/file');

// http://localhost:8080/api/file/
router.post('/', async (req, res, next) => {
    try {
        if (!req.body.searchId) {
            res.status(500).send("Invalid review request");
            console.log("Not linked to the table");
        } else {
            const newReview = await File.create({
                title: req.body.title,
                description: req.body.description,
                url: req.body.url,
                searchId: req.body.searchId
            });
            if (!newReview) {
                res.status(500).send("Impossible to post a file");
            } else {
                res.status(200).send("File created!")
            }
        }
    } catch (error) {
        next(error);
    }
})
// http://localhost:8080/api/file/:id
router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        const files = await File.findAll({
            where: {
                searchId: req.params.id
            }
        })
        console.log(files);
        if (!files) {
            res.status(200).send("No files found");
        } else {
            res.status(200).json(files);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;