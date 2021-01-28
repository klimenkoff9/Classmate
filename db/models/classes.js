const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

//Sample Model  Read More At https://sequelize.org/master/manual/model-basics.html

const Classes = db.define('classes', {
  class_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  class_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  professor_names: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
})

module.exports = Classes
