module.exports = {


  init: function () {

    return {
      isPlayer1On: false,
      isPlayer2On: false,
      viewers: 0,
      users: {}
    };

  },


  addUser: function (matchRoom, match, user) {

    const { username } = user;
    const { player1, player2 } = match;
    const users = { ...matchRoom.users };
    const isPlayer = [player1.username, player2.username].includes(username);
    const isNewUser = !users[username];
    let viewers = matchRoom.viewers;

    if (!isPlayer && isNewUser) {
      viewers += 1;
    }

    if (isNewUser) {
      users[username] = 1;
    } else {
      users[username] += 1;
    }


    return {
      isPlayer1On: !!users[player1.username],
      isPlayer2On: !!users[player2.username],
      viewers,
      users,
    };

  },


  removeUser: function (matchRoom, match, user) {

    const { username } = user;
    const { player1, player2 } = match;
    const users = { ...matchRoom.users };
    const isPlayer = [player1.username, player2.username].includes(username);
    const isLastViewFromUser = users[username] === 1;
    let viewers = matchRoom.viewers;

    if (!isPlayer && isLastViewFromUser) {
      viewers -= 1;
    }

    users[username] -= 1;
    if (isLastViewFromUser) {
      delete users[username];
    }

    return {
      isPlayer1On: !!users[player1.username],
      isPlayer2On: !!users[player2.username],
      viewers,
      users,
    };

  },


  isEmpty: function (matchRoom) {

    return Object.keys(matchRoom.users).length === 0;
    
  },


};
