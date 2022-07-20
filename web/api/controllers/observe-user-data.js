module.exports = {


  friendlyName: 'Observe user data',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function ({}) {

    if (!this.req.isSocket) {
      throw new Error('This action is designed for use with the virtual request interpreter (over sockets, not traditional HTTP).');
    }

    if (!this.req.user) {
      return;
    }

    const room = sails.rooms.userData(this.req.user);

    sails.sockets.join(this.req, room);

  },


};
