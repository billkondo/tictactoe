const mongodb = require('../mongodb');

const matchGridFromPlays = require('./match_grid_from_plays');
const matchWinner = require('./match_winner');

module.exports = {

  
  userMatches: async function (user) {

    const matches = await mongodb.match.userMatches(user);

    return matches.map(this.addGridAttribute)

  },


  findMatch: async function (matchID) {

    const match = await mongodb.match.findMatch(matchID);

    return this.addGridAttribute(match);

  },


  matchGridFromPlays,


  matchWinner,


  addGridAttribute: function (match) {

    return {
      ...match,
      grid: matchGridFromPlays(match.plays),
    };

  }


};
