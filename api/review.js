const express = require('express');
const router = express.Router();
const Review = require('../db/models/review');

// http://localhost:8080/api/review/:id
router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        const reviews = await Review.findAll({
            where: {
                searchId: req.params.id
            }
        })
        console.log(reviews);
        if (!reviews) {
            res.status(200).send("No reviews found");
        } else {
            res.status(200).json(reviews);
        }
    } catch (error) {
        next(error);
    }
})

// http://localhost:8080/api/review/new
router.post("/new", async (req, res, next) => {
    try {
        if (!req.body.searchId) {
            res.status(500).send("Invalid review request");
            console.log("Not linked to the table");
        } else if (req.body.rating < 0 || req.body.rating > 5) {
            res.status(500).send("Invalid rating input");
        } else {
            const newReview = await Review.create({
                reviewText: req.body.reviewText,
                rating: req.body.rating,
                takeAgain: req.body.takeAgain,
                textbook: req.body.textbook,
                syllabus: req.body.syllabus,
                searchId: req.body.searchId
            });
            if (!newReview) {
                res.status(500).send("Impossible to create a table");
            } else {
                res.status(200).send("Table created!")
            }
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;