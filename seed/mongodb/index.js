const mongodb = require('../../domain/mongodb');


module.exports = async function ({
  users,
  matches,
  usersInventoryData,
  usersSocialData,
}) {

  console.info('Seed MongoDB');

  console.info('  Seed Users');
  for (let i = 0; i < users.length; i++) {
    await mongodb.user.create(users[i], usersInventoryData[i], usersSocialData[i], []);
  }
  
  console.info('  Seed Matches');
  await Promise.all(matches.map(mongodb.match.add));

};
