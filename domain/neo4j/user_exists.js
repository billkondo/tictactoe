const Neo4j = require('../../databases/neo4j');

const userExists = async (username = '') => {
  const neo4j = new Neo4j();

  const query = await neo4j.session.run(`
    MATCH (user: User)
    WHERE user.username = "${username}"
    RETURN user
  `);

  return query.records.length > 0;
};

module.exports = userExists;
