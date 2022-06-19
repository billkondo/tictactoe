const addInvite = require('../../domain/redis/add_invite');
const addOngoingMatch = require('../../domain/redis/add_ongoing_match');
const pickTwoItems = require('../../utils/pick_two_items');
const seedInvite = require('./seed_invite');
const seedOngoingMatch = require('./seed_ongoing_match');

const seed = async ({ users }) => {
  const ONGOING_MATCHES_COUNT = 5;
  const INVITES_COUNT = 10;
  let usersCopy = [...users];

  for (let i = 0; i < ONGOING_MATCHES_COUNT; ++i) {
    const [player1, player2] = pickTwoItems(usersCopy);
    const ongoingMatch = seedOngoingMatch(player1, player2);

    await addOngoingMatch(ongoingMatch);
    usersCopy = usersCopy.filter((user) => !(user in [player1, player2]));
  }

  for (let i = 0; i < INVITES_COUNT; ++i) {
    const [sender, receiver] = pickTwoItems(usersCopy);
    const invite = seedInvite(sender, receiver);

    await addInvite(invite);
  }
};

module.exports = seed;
