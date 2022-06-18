const Neo4j = require('../../databases/neo4j');

const doesUserFollowUser = async (userFollowing, userFollowed) => {
  const neo4j = new Neo4j();

  const query = await neo4j.session.run(`
    MATCH (user1:User { username: "${userFollowing.username}" })
    MATCH (user2:User { username: "${userFollowed.username}" })
    RETURN EXISTS( (user1)-[:FOLLOW]->(user2) ) as isFollowing
  `);
  const result = query.records[0].toObject();

  return result.isFollowing;
};

module.exports = doesUserFollowUser;
