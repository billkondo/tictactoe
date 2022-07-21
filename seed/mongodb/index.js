const mongodb = require('../../domain/mongodb');


module.exports = async function ({
  matches,
  usersData,
}) {

  console.info('Seed MongoDB');

  console.info('  Seed Users');
  await Promise.all(usersData.map(mongodb.user.create))
  
  console.info('  Seed Matches');
  await Promise.all(matches.map(mongodb.match.add));

};
