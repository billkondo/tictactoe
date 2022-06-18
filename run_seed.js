const seedMongoDB = require('./seed/mongodb');
const seedNeo4j = require('./seed/neo4j');
const MongoDB = require('./databases/mongodb');
const Neo4j = require('./databases/neo4j');

const runSeed = async () => {
  // Clear MongoDB
  const mongo = new MongoDB();
  await mongo.db().dropDatabase();

  // Clear Neo4j
  const neo4j = new Neo4j();
  await neo4j.session.run('MATCH (n) DETACH DELETE n');

  const { users, matches } = await seedMongoDB();
  await seedNeo4j({ users, matches });
};

runSeed()
  .catch((error) => console.log(error))
  .finally(() => process.exit());
