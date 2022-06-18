const Neo4j = require('../../databases/neo4j');

const validateUserExists = require('./validate_user_exists');

const userFollowsUser = async (userFollowing, userFollowed) => {
  await validateUserExists(userFollowing.username);
  await validateUserExists(userFollowed.username);

  const neo4j = new Neo4j();

  await neo4j.session.run(`
    MATCH (userFollowing:User { username: "${userFollowing.username}" })
    MATCH (userFollowed:User { username: "${userFollowed.username}" })
    CREATE (userFollowing)-[:FOLLOW]->(userFollowed)
  `);
};

module.exports = userFollowsUser;
