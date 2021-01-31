const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    reviewText: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    takeAgain: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    textbook: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    syllabus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Review;