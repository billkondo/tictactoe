module.exports = {


  friendlyName: 'Find match',


  description: '',


  inputs: {

    matchID: {
      description: 'ID of the match.',
      type: 'string',
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({matchID}) {

    const onGoingMatch = await sails.appDomain.match.findOngoingMatch(matchID);

    if (onGoingMatch) {
      return onGoingMatch;
    }

    return await sails.appDomain.match.findMatch(matchID);

  }


};

