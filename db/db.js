const Sequelize = require('sequelize')
require('dotenv').config()

// Initialize database with Sequelize
const db = new Sequelize('capstone', 'unode', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5433,
})

module.exports = db
