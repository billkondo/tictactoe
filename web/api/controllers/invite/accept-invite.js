module.exports = {


  friendlyName: 'Accept invite',


  description: '',


  inputs: {

    matchID: {
      description: 'Invite match.',
      type: 'string',
      required: true,
    },

  },


  exits: {

  },


  fn: async function ({matchID}) {

    const { url } = await sails.appDomain.match.acceptInvite({
      matchID,
      user: this.req.user,
    });

    return url;

  }


};
