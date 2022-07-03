const neo4j = require('../../databases/neo4j');
const User = require('./user');


module.exports = {


  doesUserFollowsUser: async function (userFollowing, userFollowed) {

    const query = await neo4j.session().run(`
      MATCH (user1:User { username: "${userFollowing.username}" })
      MATCH (user2:User { username: "${userFollowed.username}" })
      RETURN EXISTS( (user1)-[:FOLLOW]->(user2) ) as isFollowing
    `);
    const result = query.records[0].toObject();

    return result.isFollowing;

  },


  userFollowsUser: async function (userFollowing, userFollowed) {

    await User.validateUserExists(userFollowing.username);
    await User.validateUserExists(userFollowed.username);

    await neo4j.session().run(`
      MATCH (userFollowing:User { username: "${userFollowing.username}" })
      MATCH (userFollowed:User { username: "${userFollowed.username}" })
      CREATE (userFollowing)-[:FOLLOW]->(userFollowed)
    `);

  },


};
