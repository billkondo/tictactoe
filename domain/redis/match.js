const redis = require('../../databases/redis');


module.exports = {

  add: async function (match) {

    const matchKey = redis.matchKey(match);

    await redis.json.set(matchKey, '.', match);

  },

};
