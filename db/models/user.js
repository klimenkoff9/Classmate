const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require ('crypto');

//Sample Model  Read More At https://sequelize.org/master/manual/model-basics.html

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }    
  }
});

module.exports = User;

// User.prototype.correctPassword = (password) => {
//   return User.encryptPassword(password, this.salt) === this.password();
// }

// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString("base64")
// }

// User.encryptPassword = function(text, salt) {
//   return crypto.createHash('RSA-SHA256').update(text).update(salt).digest('hex');
// }

// const setSaltPass = (user) => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// User.beforeCreate(setSaltPass);
// User.beforeUpdate(setSaltPass);
// User.beforeBulkCreate(user => {
//   user.forEach(setSaltPass)
// })

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}
/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}
User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}
/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

