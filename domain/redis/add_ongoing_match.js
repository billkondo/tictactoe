const Redis = require('../../databases/redis');

const addOngoingMatch = async (match) => {
  const redis = new Redis();
  const matchKey = redis.matchKey(match);

  await redis.connect();
  await redis.client.set(matchKey, JSON.stringify(match));
};

module.exports = addOngoingMatch;
