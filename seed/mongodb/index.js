const MongoDB = require('../../databases/mongodb');

const seed = async ({
  users,
  matches,
  usersInventoryData,
  usersSocialData,
}) => {
  console.info('Seed MongoDB');

  const mongo = new MongoDB();

  await mongo.connect();

  console.info('  Seed Users');
  const usersModels = [];
  for (let i = 0; i < users.length; i++) {
    const userModel = {
      userID: users[i].userID,
      username: users[i].username,
    };

    userModel.banner = usersInventoryData[i].banner;
    userModel.inventory = usersInventoryData[i].inventory;
    userModel.followersCount = usersSocialData[i].followersCount;
    userModel.followingCount = usersSocialData[i].followingCount;

    usersModels.push(userModel);
  }
  await mongo.usersCollection().insertMany(usersModels);

  console.info('  Seed Matches');
  await mongo.matchesCollection().insertMany(matches);
};

module.exports = seed;
