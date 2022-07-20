module.exports = {


  INVITE: 'INVITE',


  ONGOING_MATCH: 'ONGOING_MATCH',


  inviteNotificationID: function (match) {

    const { matchID } = match;

    return `${this.INVITE}:${matchID}`;

  },


  ongoingMatchNotificationID: function (ongoingMatch) {

    const { matchID } = ongoingMatch;

    return `${this.ONGOING_MATCH}:${matchID}`;

  },

};
