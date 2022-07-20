module.exports = {


  friendlyName: 'Create invite',


  description: '',


  inputs: {

    secondsPerSide: {
      description: 'Initial time limit.',
      type: 'number',
      required: true,
    },

    increment: {
      description: 'How many seconds each player gains after their play.',
      type: 'number',
      required: true,
    },

    pieces: {
      description: 'Whether the player sending the invite is playing with "X" or "O" or "random".',
      type: 'string',
      required: true,
    },

    userID: {
      description: 'User receiving the invite.',
      type: 'string',
      required: true,
    },

  },


  exits: {

    userDoesNotExist: {
      description: 'There is not user with id equals `userID`.'
    },

    inviteToYourself: {
      description: 'Can\'t send invite to yourself.'
    },

  },


  fn: async function ({secondsPerSide, increment, pieces, userID}) {

    const me = this.req.user;
    const otherUser = await sails.appDomain.user.findByID(userID);

    if (!otherUser) {
      throw 'userDoesNotExist';
    }

    if (me.userID === otherUser.userID) {
      throw 'inviteToYourself';
    }

    const timeFormat = {
      limit: secondsPerSide,
      increment,
    };
    const { match, invite } = await sails.appDomain.match.createInvite({
      timeFormat,
      sender: me,
      receiver: otherUser,
      senderPieces: pieces,
    });

    if (sails.hooks.sockets) {
      await sails.helpers.broadcastUserDataChange(otherUser);
    }

    return {
      match,
      invite,
    };

  },


};
