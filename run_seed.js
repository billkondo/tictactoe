const seedMongoDB = require('./seed/mongodb');
const seedNeo4j = require('./seed/neo4j');
const seedRedis = require('./seed/redis');
const MongoDB = require('./databases/mongodb');
const Neo4j = require('./databases/neo4j');
const Redis = require('./databases/redis');

const runSeed = async () => {
  // Clear MongoDB
  const mongo = new MongoDB();
  await mongo.db().dropDatabase();

  // Clear Neo4j
  const neo4j = new Neo4j();
  await neo4j.session.run('MATCH (n) DETACH DELETE n');

  // Clear Redis
  const redis = new Redis();
  await redis.connect();
  await redis.client.flushAll();

  const { users, matches } = await seedMongoDB();
  await seedNeo4j({ users, matches });
  await seedRedis({ users });
};

runSeed()
  .catch((error) => console.log(error))
  .finally(() => process.exit());
