const redis = require('../../databases/redis');


module.exports = {

  matchKey: function (matchID) {
    
    return `MATCH:${matchID}`;

  },


  add: async function (match) {

    const key = this.matchKey(match.matchID)

    await redis.json.set(key, '.', match);

  },


  find: async function (matchID) {

    const key = this.matchKey(matchID);

    return await redis.json.get(key);

  },

};
