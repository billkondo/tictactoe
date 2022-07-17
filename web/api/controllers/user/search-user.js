module.exports = {


  friendlyName: 'Search user',


  description: '',


  inputs: {

    username: {
      description: 'Search user with given username.',
      type: 'string',
    },

  },


  exits: {

  },


  fn: async function ({username = ''}) {

    const users = await sails.appDomain.user.searchByUsername(username);

    return {
      users: users.map(user => ({
        username: user.username,
        userID: user.userID,
      })),
    };

  }


};
