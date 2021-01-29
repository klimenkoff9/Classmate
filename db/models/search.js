const Sequelize = require('sequelize');
const db = require('../db');

const Search = db.define('search', {

    facultyName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    className: {
        type: Sequelize.STRING,
        allowNull: false
    },
    classNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    classDescription: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false
});

module.exports = Search;