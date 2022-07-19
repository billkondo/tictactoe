const match = require('../../domain/redis/match');


const seed = async ({ ongoingMatches }) => {

  console.info('Seed Redis');

  console.info('  Seed Ongoing Matches');
  await Promise.all(ongoingMatches.map(ongoingMatch => match.add(ongoingMatch)));

};


module.exports = seed;
