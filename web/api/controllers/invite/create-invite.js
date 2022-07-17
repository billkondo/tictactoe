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

  },


  fn: async function ({secondsPerSide, increment, pieces, userID}) {

    console.log(secondsPerSide, increment, pieces, userID);

    return;

  }


};
