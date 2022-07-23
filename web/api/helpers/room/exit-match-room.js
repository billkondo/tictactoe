module.exports = {


  friendlyName: 'Exit match room',


  description: '',


  inputs: {

    user: {
      description: 'User that entered in the room.',
      type: 'ref',
      required: true
    },

    match: {
      description: 'Match.',
      type: 'ref',
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({user, match}) {

    const { matchID } = match;
    const roomID = `MATCH-ROOM:${matchID}`;

    let matchRoomData = await sails.appRedis.json.get(roomID);

    if (!matchRoomData) {
      sails.log.warn('Inconsistent data found in exitMatchRoom helper');
      return;
    }

    matchRoomData = sails.appDomain.matchRoom.removeUser(matchRoomData, match, user);

    if (sails.appDomain.matchRoom.isEmpty(matchRoomData)) {
      await sails.appRedis.json.del(roomID);
    } else {
      await sails.appRedis.json.set(roomID, '.', matchRoomData);
      sails.sockets.broadcast(roomID, 'match-room-changed', matchRoomData);
    }

  }


};

