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
    const match = await sails.helpers.findMatch(matchID);

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
