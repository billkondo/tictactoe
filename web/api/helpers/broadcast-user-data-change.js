module.exports = {


  friendlyName: 'Broadcast user data change',


  description: '',


  inputs: {

    user: {
      description: 'User whose that was changed.',
      type: 'ref',
      required: true
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({user}) {

    const { username } = user;
    const room = sails.rooms.userData(user);
    const userData = await sails.appDomain.user.data(username);

    sails.sockets.broadcast(room, 'user-data-changed', userData);

  }


};

