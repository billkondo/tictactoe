const mongodb = require('../mongodb');
const redis = require('../redis');

const { generateUUID, tossACoin } = require('../../utils');
const { WAITING_FOR_START } = require('../match_result');
const { INVITE } = require('../notification');

const matchGridFromPlays = require('./match_grid_from_plays');
const matchWinner = require('./match_winner');


module.exports = {

  
  create: function ({timeFormat, player1, player2}) {

    const matchID = generateUUID();
    const now = new Date();

    return {
      matchID,
      timeFormat,
      startTime: now,
      player1: {
        username: player1.username,
        rating: player1.rating,
        ratingDelta: player1.ratingDelta,
      },
      player2: {
        username: player2.username,
        rating: player2.rating,
        ratingDelta: player2.ratingDelta,
      },
      result: WAITING_FOR_START,
      plays: [],
    }

  },


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

  },


  createInvite: async function ({timeFormat, sender, receiver, senderPieces = 'random', sentTime = Date.now()}) {

    const player1 = (senderPieces === 'O' || (senderPieces === 'random' && tossACoin())) ? sender : receiver;
    const player2 = (sender === player1) ? receiver : sender;
    const match = this.create({timeFormat, player1, player2});
    const invite = {
      matchID: match.matchID,
      sender: {
        username: sender.username,
        userID: sender.userID,
      },
      receiver: {
        username: receiver.username,
        userID: receiver.userID,
      },
      timeFormat,
      sentTime,
      type: INVITE,
    };

    await redis.match.add(match);
    await mongodb.user.pushInvite(invite);

    return { match, invite };

  },


};
