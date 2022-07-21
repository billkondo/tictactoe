const mongodb = require("../../databases/mongodb");


module.exports = {


  create: async function (userData) {

    await mongodb.users().insertOne(userData);
    
  },


  find: async function (username) {

    const user = await mongodb.users().findOne({ username });

    if (user) {
      delete user._id;

      return user;
    }

    return null;

  },


  pushNotification: async function (user, notification) {

    const { userID } = user;
    
    await mongodb.users().updateOne(
      { userID }, 
      { "$push": { notifications: notification } },
    );

  },


  popNotification: async function (user, notificationID) {

    const { userID } = user;

    await mongodb.users().updateOne(
      { userID },
      { "$pull": { notifications: { notificationID } } }
    );

  }

};
