const Sequelize = require('sequelize')
require('dotenv').config()

// Initialize database with Sequelize

const db = new Sequelize(
  process.env.DATABASE_URL,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        sslmode: 'require',
        rejectUnauthorized: false,
      },
    },
  }
)

module.exports = db
