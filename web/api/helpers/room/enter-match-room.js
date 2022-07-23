module.exports = {


  friendlyName: 'Enter match room',


  description: '',


  inputs: {

    req: {
      type: 'ref',
      required: true,
    },

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


  fn: async function ({req, user, match}) {

    const { matchID } = match;
    const roomID = `MATCH-ROOM:${matchID}`;
    const socketID = sails.sockets.getId(req);

    let matchRoomData = await sails.appRedis.json.get(roomID);

    if (!matchRoomData) {
      matchRoomData = sails.appDomain.matchRoom.init();
    }

    matchRoomData = sails.appDomain.matchRoom.addUser(matchRoomData, match, user);

    await sails.appRedis.json.set(roomID, '.', matchRoomData);
    await sails.appRedis.json.set(`SOCKET:${socketID}`, '.', { match, user, socketID, type: 'MATCH_ROOM' });

    sails.sockets.broadcast(roomID, 'match-room-changed', matchRoomData);

  },


};

