const Sequelize = require('sequelize');
const db = require('../db');

//Sample Model  Read More At https://sequelize.org/master/manual/model-basics.html

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = User;
