const { faker } = require('@faker-js/faker');
const MongoDB = require('../../databases/mongodb');
const { BANNER } = require('../../domain/item_category');

const seedItem = require('./seed_item');
const seedUser = require('./seed_user');
const seedMatch = require('./seed_match');

const seed = async () => {
  const ITEMS_COUNT = 10;
  const items = [];
  const USERS_COUNT = 50;
  const users = [];
  const MATCHES_COUNT = 150;
  const matches = [];

  for (let i = 0; i < ITEMS_COUNT; ++i) items.push(seedItem());

  for (let i = 0; i < USERS_COUNT; ++i) {
    const userHasInventoryFilled = faker.datatype.boolean();
    const user = seedUser();

    if (userHasInventoryFilled) {
      const itemsInInventoryCount = faker.datatype.number({
        min: 1,
        max: items.length - 1,
      });

      user.inventory.push(...selectItems(items, itemsInInventoryCount));
    }

    setUserBanner(user);

    users.push(user);
  }

  for (let i = 0; i < MATCHES_COUNT; ++i) {
    const firstUserID = faker.datatype.number({
      min: 0,
      max: users.length - 1,
    });
    let secondUserID = faker.datatype.number({ min: 0, max: users.length - 1 });

    while (secondUserID === firstUserID)
      secondUserID = faker.datatype.number({ min: 0, max: users.length - 1 });

    const match = seedMatch(users[firstUserID], users[secondUserID]);

    matches.push(match);
  }

  saveData({ users, matches });

  return { users, matches };
};

const selectItems = (items, itemsToChoose = 0) => {
  const selectedItems = [];
  const itemsCopy = [...items];

  while (selectedItems.length < itemsToChoose) {
    const id = faker.datatype.number({ min: 0, max: itemsCopy.length - 1 });
    const selectedItem = itemsCopy[id];

    selectedItems.push(selectedItem);
    itemsCopy.splice(id, 1);
  }

  return selectedItems;
};

const setUserBanner = (user) => {
  const userBanners = user.inventory.filter((item) => item.category === BANNER);

  if (userBanners.length > 0) {
    user.banner =
      userBanners[
        faker.datatype.number({ min: 0, max: userBanners.length - 1 })
      ];
  }
};

const saveData = async ({ users, matches }) => {
  const mongo = new MongoDB();

  await mongo.connect();
  await mongo.usersCollection().insertMany(users);
  await mongo.matchesCollection().insertMany(matches);
};

module.exports = seed;
