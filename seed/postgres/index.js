const { itemCategories } = require('../../domain/item_category');
const postgres = require('../../domain/postgres');


module.exports = async function ({ users, stores }) {

  console.info('Seed Postgres');

  console.info('  Seed Users');
  await Promise.all(users.map(postgres.user.create));

  console.info('  Seed Stores');
  await Promise.all(stores.map(postgres.store.createStore));

  console.info('  Seed Item Categories');
  await Promise.all(itemCategories.map(postgres.store.createItemCategory));

};
