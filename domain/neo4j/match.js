const { types } = require('neo4j-driver');

const neo4j = require("../../databases/neo4j");
const User = require('./user');


module.exports = {


  add: async function (match) {

    const { player1, player2, matchID, startTime, timeFormat, result } = match;

    await User.validateUserExists(player1.username);
    await User.validateUserExists(player2.username);

    await neo4j.session().run(`
      MATCH (player1:User { username: "${player1.username}" })
      MATCH (player2:User { username: "${player2.username}" })
      CREATE (match:Match {
        matchID: "${matchID}",
        startTime: ${types.Date.fromStandardDate(startTime)},
        timeFormatLimit: ${timeFormat.limit},
        timeFormatIncrement: ${timeFormat.increment},
        result: "${result}"
      })
      CREATE (player1)-[:PLAY {
        rating: ${player1.rating}, 
        ratingDelta: ${player1.ratingDelta}}]->(match)
      CREATE (player2)-[:PLAY {
        rating: ${player2.rating}, 
        ratingDelta: ${player2.ratingDelta}}]->(match)
    `);

  },


};
