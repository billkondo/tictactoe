const userFollowsUser = require('../../domain/neo4j/user_follows_user');
const addUser = require('../../domain/neo4j/add_user');
const addMatch = require('../../domain/neo4j/add_match');

const seed = async ({ users, matches, usersGameData, followings }) => {
  console.info('Seed Neo4J');

  console.info('  Seed Users');
  for (let i = 0; i < users.length; i++)
    await addUser(users[i], usersGameData[i]);

  console.info('  Seed Matches');
  for (const match of matches) await addMatch(match);

  console.info('  Seed Followings');
  for (const following of followings) {
    const [user1, user2] = following;

    await userFollowsUser(users[user1], users[user2]);
  }
};

module.exports = seed;
