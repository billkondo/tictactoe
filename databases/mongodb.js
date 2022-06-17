const { MongoClient } = require('mongodb');

class MongoDB {
  URL = 'mongodb://localhost:27017';
  DB_NAME = 'TIC_TAC_TOE';
  USERS_COLLECTION = 'USERS';
  MATCHES_COLLECTION = 'MATCHES';

  constructor() {
    this.client = new MongoClient(this.URL);
  }

  async connect() {
    await this.client.connect();
  }

  db() {
    return this.client.db(this.DB_NAME);
  }

  usersCollection() {
    return this.db().collection(this.USERS_COLLECTION);
  }

  matchesCollection() {
    return this.db().collection(this.MATCHES_COLLECTION);
  }
}

module.exports = MongoDB;
