const seedMongoDB = require('./seed/mongodb');
const seedNeo4j = require('./seed/neo4j');
const seedRedis = require('./seed/redis');
const MongoDB = require('./databases/mongodb');
const Neo4j = require('./databases/neo4j');
const Redis = require('./databases/redis');
const postgres = require('./databases/postgres');
const seedUser = require('./seed/users/seed_users');
const seedPostgres = require('./seed/postgres');
const createTables = require('./domain/postgres/create_tables');

const runSeed = async () => {
  console.info('Clear Postgres');
  await postgres.dropSchema();
  await postgres.createSchema();

  console.info('Create Postgres Tables');
  await createTables();

  console.info('Clear Mongo');
  const mongo = new MongoDB();
  await mongo.db().dropDatabase();

  console.info('Clear Neo4j');
  const neo4j = new Neo4j();
  await neo4j.session.run('MATCH (n) DETACH DELETE n');

  console.info('Clear Redis');
  const redis = new Redis();
  await redis.connect();
  await redis.client.flushAll();

  console.info('Seed users');
  const USERS_COUNT = 50;
  const users = [...Array(USERS_COUNT)].map(seedUser);

  await seedPostgres({ users });
  // const { users, matches } = await seedMongoDB();
  // await seedNeo4j({ users, matches });
  // await seedRedis({ users });
};

runSeed()
  .catch((error) => console.log(error))
  .finally(() => process.exit());
