const db = require('./db');
const Players = require('./db/models').Player;

const seedPlayers = [
  { firstName: 'Bilbo', lastName: 'Baggins', jerseyNumber: 11 },
  { firstName: 'Harry', lastName: 'Potter', jerseyNumber: 22 },
  { firstName: 'Lucifer', lastName: 'Morningstart', jerseyNumber: 666 },
];

const seed = () => {
  return Players.bulkCreate(seedPlayers);
};
seed().then(() => process.exit());
