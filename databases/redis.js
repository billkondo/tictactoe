const { createClient } = require('redis');

class Redis {
  URL = 'redis://@localhost:6379';

  constructor() {
    this.client = createClient({ url: this.URL });
  }

  async connect() {
    await this.client.connect();
  }

  matchKey(match) {
    const { matchID } = match;

    return `MATCH:${matchID}`;
  }

  inviteKey(invite) {
    const { senderID, receiverID } = invite;

    return `INVITE:${senderID}:${receiverID}`;
  }
}

module.exports = Redis;
