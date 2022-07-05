const seedMongoDB = require('./seed/mongodb');
const seedNeo4j = require('./seed/neo4j');
const seedRedis = require('./seed/redis');
const mongodb = require('./databases/mongodb');
const neo4j = require('./databases/neo4j');
const Redis = require('./databases/redis');
const postgres = require('./databases/postgres');
const seedUser = require('./seed/users/seed_user');
const seedPostgres = require('./seed/postgres');
const createTables = require('./domain/postgres/create_tables');
const seedUserGameData = require('./seed/users/seed_user_game_data');
const seedItem = require('./seed/items/seed_item');
const seedUserInventoryData = require('./seed/users/seed_user_inventory_data');
const seedUserSocialData = require('./seed/users/seed_user_social_data');
const config = require('./seed/config');
const seedMatches = require('./seed/matches/seed_matches');
const seedInventory = require('./seed/items/seed_inventory');
const seedFollowings = require('./seed/users/seed_followings');
const seedOngoingMatches = require('./seed/matches/seed_ongoing_matches');
const seedInvites = require('./seed/matches/invites/seed_invites');
const officialStore = require('./domain/store/official_store');
const { coins } = require('./domain/store/coins');
const seedStoreItems = require('./seed/items/seed_stores_items');


const runSeed = async () => {

  console.info('Clear Postgres');
  await postgres.dropSchema();
  await postgres.createSchema();

  console.info('Create Postgres Tables');
  await createTables();

  console.info('Clear Mongo');
  await mongodb.dropDatabase();

  console.info('Clear Neo4j');
  await neo4j.session().run('MATCH (n) DETACH DELETE n');

  console.info('Clear Redis');
  const redis = new Redis();
  await redis.connect();
  await redis.client.flushAll();

  const {
    USERS_COUNT,
    ITEMS_COUNT,
    MATCHES_COUNT,
    FOLLOWINGS_COUNT,
    ONGOING_MATCHES_COUNT,
    INVITES_COUNT,
  } = config;

  console.info('Seed users');
  const users = [...Array(USERS_COUNT)].map(seedUser);

  console.info('Seed users data');
  const usersGameData = [...Array(USERS_COUNT)].map(seedUserGameData);
  const usersInventoryData = [...Array(USERS_COUNT)].map(seedUserInventoryData);
  const usersSocialData = [...Array(USERS_COUNT)].map(seedUserSocialData);

  console.info('Seed stores');
  const stores = [
    officialStore,
    {
      name: 'Test Store',
      storeID: '9e3157b9-fc86-415a-ab45-a22d269cc58b',
      description: 'Some products here',
    },
  ];

  console.info('Seed items');
  const items = [...Array(ITEMS_COUNT)].map(seedItem);

  console.info('Seed stores items');
  const storesItems = seedStoreItems(stores, items);

  console.info('Seed inventory');
  seedInventory(usersInventoryData, items);

  console.info('Seed matches');
  const matches = seedMatches(MATCHES_COUNT, users, usersGameData);
  const ongoingMatches = seedOngoingMatches(
    ONGOING_MATCHES_COUNT,
    users,
    usersGameData
  );
  const invites = seedInvites(INVITES_COUNT, users);

  console.info('Seed followings');
  const followings = seedFollowings(FOLLOWINGS_COUNT, users, usersSocialData);

  await seedPostgres({ users, stores, coins, items, storesItems });
  await seedMongoDB({ users, usersInventoryData, usersSocialData, matches });
  await seedNeo4j({ users, matches, usersGameData, followings });
  await seedRedis({ ongoingMatches, invites });

};


runSeed()
  .catch((error) => console.log(error))
  .finally(() => process.exit());
