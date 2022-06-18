const Neo4j = require('../../databases/neo4j');

const addUser = async (user) => {
  const neo4j = new Neo4j();
  const { userID, username, rating } = user;

  await neo4j.session.run(`
    CREATE (user:User { 
      userID: "${userID}", 
      username: "${username}",
      rating: ${rating}
    })
  `);
};

module.exports = addUser;
