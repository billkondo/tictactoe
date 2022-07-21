module.exports = {


  friendlyName: 'View match',


  description: 'Display "Match" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/match/match'
    },

    notFound: {
      viewTemplatePath: '404',
    },

  },


  fn: async function () {

    const { matchID } = this.req.params;
    let match = await sails.appDomain.match.findOngoingMatch(matchID);

    if (match) {

    } else {
      match = await sails.appDomain.match.findMatch(matchID);
    }

    if (!match) {
      throw 'notFound';
    }

    const { player1, player2 } = match;

    return {
      match,
      player1,
      player2,
    };

  }


};
