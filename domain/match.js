const mongodb = require('./mongodb');

const matchGridFromPlays = require('./matches/match_grid_from_plays');


module.exports = {


  userMatches: async function (user) {

    return mongodb.match.userMatches(user);

  },


  matchGridFromPlays,


}
