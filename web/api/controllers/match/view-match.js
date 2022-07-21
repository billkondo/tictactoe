module.exports = {


  friendlyName: 'View match',


  description: 'Display "Match" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/match/match'
    }

  },


  fn: async function () {

    const { matchID } = this.req.params;
    let match = await sails.appDomain.match.findOngoingMatch(matchID);

    if (match) {

    } else {
      match = await sails.appDomain.match.findMatch(matchID);
    }

    if (!match) {
      return this.res.notFound();
    }

    const { player1, player2 } = match;

    return {
      match,
      player1,
      player2,
    };

  }


};
