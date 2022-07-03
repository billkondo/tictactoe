const neo4j = require('../../domain/neo4j');


module.exports = async function ({ 
  users, 
  matches, 
  usersGameData, 
  followings 
}) {

  console.info('Seed Neo4J');

  console.info('  Seed Users');
  for (let i = 0; i < users.length; i++)
    await neo4j.user.create(users[i], usersGameData[i]);

  console.info('  Seed Matches');
  for (const match of matches) await neo4j.match.add(match);

  console.info('  Seed Followings');
  for (const following of followings) {
    const [user1, user2] = following;

    await neo4j.social.userFollowsUser(users[user1], users[user2]);
  }

};
