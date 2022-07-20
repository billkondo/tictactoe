const mongodb = require("../../databases/mongodb");


module.exports = {


  create: async function (user, userInventoryData, userSocialData, userNotifications) {

    const userModel = {
      userID: user.userID,
      username: user.username,
      banner: userInventoryData.banner,
      inventory: userInventoryData.inventory,
      notifications: userNotifications,
      followersCount: userSocialData.followersCount,
      followingCount: userSocialData.followingCount,
    };

    await mongodb.users().insertOne(userModel);
    
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
