const pickTwoItems = require('../../utils/pick_two_items');
const seedMatch = require('./seed_match');

const seedMatches = (matchesCount, users, usersGameData) => {
  const matches = [];

  for (let i = 0; i < matchesCount; ++i) {
    const [user1, user2] = pickTwoItems(users);

    matches.push(
      seedMatch(
        users[user1],
        usersGameData[user1],
        users[user2],
        usersGameData[user2]
      )
    );
  }

  return matches;
};

module.exports = seedMatches;
