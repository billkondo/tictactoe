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
    const match = await sails.appDomain.match.findMatch(matchID);
    const { player1, player2 } = match;

    return {
      match,
      player1,
      player2,
    };

  }


};
