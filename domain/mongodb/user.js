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

  },

  addToInventory: async function (user_id, inventoryEntry) {
    const result = await mongodb.users().updateOne({userID : user_id}, {$push : {inventory : inventoryEntry}});
    return result;
  },

  removeFromInventory: async function (user_id, inventoryEntry) {
    const result = await mongodb.users().updateOne({userID : user_id}, {$pop : {inventory : 1}});
    return result;
  },

};
