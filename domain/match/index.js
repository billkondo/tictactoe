const mongodb = require('../mongodb');
const redis = require('../redis');

const { generateUUID, tossACoin } = require('../../utils');
const { WAITING_FOR_START } = require('../match_result');
const { INVITE, ONGOING_MATCH } = require('../notification');

const matchGridFromPlays = require('./match_grid_from_plays');
const matchWinner = require('./match_winner');


module.exports = {


  matchURL: function (matchID) {

    return `/match/${matchID}`;

  },

  
  build: function ({timeFormat, player1, player2, fromInvite=false}) {

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
      fromInvite,
    }

  },


  buildOngoingMatchNotification: function ({ match, user }) {

    const { matchID, player1, player2 } = match;
    const opponent = player1.userID === user.userID ? player2 : player1;

    return {
      opponent,
      url: this.matchURL(matchID),
      sentTime: Date.now(),
      type: ONGOING_MATCH,
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
    const match = this.build({timeFormat, player1, player2, fromInvite: true});
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
    await mongodb.user.pushNotification(receiver, invite);
    await this.assignedToMatch({user: sender, match});

    return { match, invite };

  },


  acceptInvite: async function ({user, matchID}) {

    const match = await redis.match.find(matchID);

    if (!match) {
      return;
    }

    await mongodb.user.popNotification(user, { matchID, type: INVITE });
    await this.assignedToMatch({user, match});

    return notification;

  },


  assignedToMatch: async function ({user, match}) {

    const notification = this.buildOngoingMatchNotification({ match, user });
    await mongodb.user.pushNotification(user, notification);

    return notification;

  }


};
