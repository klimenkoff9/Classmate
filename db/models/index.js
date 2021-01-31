const User = require('./user');
const Search = require('./search');
const Review = require('./review');
const File = require('./file');

Search.hasMany(Review);
Search.hasMany(File);
Review.belongsTo(Search);
File.belongsTo(Search);

module.exports = {
  User,
  Search,
  Review,
  File
};
