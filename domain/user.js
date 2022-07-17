const mongodb = require('./mongodb');
const neo4j = require('./neo4j');
const postgres = require('./postgres');

const generateUUID = require('../utils/generate-uuid');


module.exports = {


  create: async function ({emailAddress, fullName, username}) {

    const userID = generateUUID();
    const user = {
      userID,
      email: emailAddress, 
      name: fullName,
      username,
      registerDate: new Date(Date.now()),
    };
    const userInventoryData = {
      banner: null,
      inventory: [],
    };
    const userSocialData = {
      followersCount: 0,
      followingCount: 0,
    };
    const userGameData = {
      rating: 500,
      matches: 0,
      wins: 0,
      draws: 0,
      loses: 0,
    };
    const userNotifications = [];

    await postgres.user.create(user);
    await mongodb.user.create(user, userInventoryData, userSocialData, userNotifications);
    await neo4j.user.create(user, userGameData);

  },


  findAll: async function () {

    return postgres.user.findAll();

  },


  findByUsername: async function (username) {

    return await postgres.user.findByUsername(username);

  },


  findByID: async function (userID) {

    return await postgres.user.findByID(userID);

  },


  usernameAvailable: async function (username) {

    const user = await this.findByUsername(username);

    // User with username was found, so username is not available
    if (user)
      return false;

    return true;

  },


  searchByUsername: async function (username) {

    return postgres.user.searchByUsername(username, 5);

  },


  data: async function (username) {

    return await mongodb.user.find(username);

  },

  
};
