const addInvite = require('../../domain/redis/add_invite');
const addOngoingMatch = require('../../domain/redis/add_ongoing_match');

const seed = async ({ ongoingMatches, invites }) => {
  console.info('Seed Redis');

  await Promise.all(ongoingMatches.map(addOngoingMatch));
  await Promise.all(invites.map(addInvite));
};

module.exports = seed;
