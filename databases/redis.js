const { createClient } = require('redis');


const URL = 'redis://@localhost:6379';


const redis = createClient({ url: URL });


redis.matchKey = function (match) {

  const { matchID } = match;

  return `MATCH:${matchID}`;

}


module.exports = redis;
