const mongodb = require('../../databases/mongodb');


module.exports = async function ({
  users,
  matches,
  usersInventoryData,
  usersSocialData,
}) {

  console.info('Seed MongoDB');

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
  await mongodb.users().insertMany(usersModels);

  console.info('  Seed Matches');
  await mongodb.matches().insertMany(matches);

};
