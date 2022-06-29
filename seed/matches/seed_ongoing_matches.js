const pickTwoItems = require('../../utils/pick_two_items');
const seedOngoingMatch = require('./seed_ongoing_match');

const seedOngoingMatches = (ongoingMatchesCount, users, usersGameData) => {
  const ongoingMatches = [];
  let usersCopy = [...users];

  for (let i = 0; i < ongoingMatchesCount; ++i) {
    const [user1, user2] = pickTwoItems(usersCopy);
    const ongoingMatch = seedOngoingMatch(
      users[user1],
      usersGameData[user1],
      users[user2],
      usersGameData[user2]
    );

    ongoingMatches.push(ongoingMatch);
    usersCopy = usersCopy.filter((_, index) => !(index in [user1, user2]));
  }

  return ongoingMatches;
};

module.exports = seedOngoingMatches;
