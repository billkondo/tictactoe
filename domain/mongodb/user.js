const mongodb = require("../../databases/mongodb");


module.exports = {


  create: async function (user, userInventoryData, userSocialData) {

    const userModel = {
      userID: user.userID,
      username: user.username,
      banner: userInventoryData.banner,
      inventory: userInventoryData.inventory,
      followersCount: userSocialData.followersCount,
      followingCount: userSocialData.followingCount,
    };

    await mongodb.users().insertOne(userModel);
    
  },


};
