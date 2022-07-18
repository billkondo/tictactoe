const mongodb = require("../../databases/mongodb");


module.exports = {

  
  add: async function (match) {

    await mongodb.matches().insertOne(match);

  },


  userMatches: async function (user) {

    const { username } = user;
    const matches = await mongodb.matches().find({ 
      $or: [
        { "player1.username": username },
        { "player2.username": username }
      ] 
    }).sort([['startTime', 'desc']]).toArray();

    return matches;

  },


  findMatch: async function (matchID) {

    return await mongodb.matches().findOne({
      matchID,
    });
    
  },


}
