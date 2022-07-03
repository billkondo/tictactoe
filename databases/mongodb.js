const { MongoClient } = require('mongodb');


const URL = 'mongodb://localhost:27017';
const DB_NAME = 'TIC_TAC_TOE';
const USERS_COLLECTION = 'USERS';
const MATCHES_COLLECTION = 'MATCHES';


const mongodb = new MongoClient(URL);


mongodb.users = function () {
  return mongodb.db(DB_NAME).collection(USERS_COLLECTION);
}


mongodb.matches = function () {
  return mongodb.db(DB_NAME).collection(MATCHES_COLLECTION);
}


mongodb.dropDatabase = async function () {
  await mongodb.db(DB_NAME).dropDatabase();
}


module.exports = mongodb;
