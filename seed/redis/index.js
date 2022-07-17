const match = require('../../domain/redis/match');


const seed = async ({ ongoingMatches }) => {

  console.info('Seed Redis');

  console.info('  Seed Ongoing Matches');
  await Promise.all(ongoingMatches.map(match.add));

};


module.exports = seed;
