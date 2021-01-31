const User = require('./user');
const Search = require('./search');
const Review = require('./review');

Search.hasMany(Review);
Review.belongsTo(Search);

module.exports = {
  User,
  Search,
  Review
};
