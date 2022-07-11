const { itemCategories } = require('../../domain/item_category');
const postgres = require('../../domain/postgres');


module.exports = async function ({ 
  users,
  stores,
  coins,
  items,
  storesItems,
  matchCoinsWallets,
  tournmentCoinsWallets,
}) {

  console.info('Seed Postgres');

  console.info('  Seed Users');
  await Promise.all(users.map(postgres.user.create));

  console.info('  Seed Stores');
  await Promise.all(stores.map(postgres.store.createStore));

  console.info('  Seed Coins');
  await Promise.all(coins.map(postgres.store.createCoin));

  console.info('  Seed Item Categories');
  await Promise.all(itemCategories.map(postgres.store.createItemCategory));

  console.info('  Seed Items');
  await Promise.all(items.map(postgres.store.createItem));

  console.info('  Seed Stores Items');
  for (const storeItems of storesItems) {
    const { store } = storeItems;

    for (const item of storeItems.items) {
      const { startTime, endTime, promoValue } = item;

      await postgres.store.addItemToStore(item, store, startTime, endTime, promoValue);
    }
  }

  console.info('  Seed wallets');
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const matchCoinsWallet = matchCoinsWallets[i];
    const tournmentCoinsWallet = tournmentCoinsWallets[i];

    await postgres.wallet.create(user, matchCoinsWallet);
    await postgres.wallet.create(user, tournmentCoinsWallet);
  }

};
