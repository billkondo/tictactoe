module.exports = {


  friendlyName: 'Observe match',


  description: '',


  inputs: {

    matchID: {
      description: 'ID of the observed match.',
      type: 'string',
      required: true,
    },

  },


  exits: {

    success: {
      description: 'The requesting socket is now subscribed to socket broadcasts about the match.',
    },

  },


  fn: async function ({matchID}) {

    if (!this.req.isSocket) {
      throw new Error('This action is designed for use with the virtual request interpreter (over sockets, not traditional HTTP).');
    }

    const match = await sails.helpers.findMatch(matchID);

    await sails.helpers.room.enterMatchRoom(this.req, this.req.user, match);

  },


};
