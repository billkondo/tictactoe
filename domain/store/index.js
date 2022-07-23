const postgres = require('../postgres');
const mongodb = require('../mongodb');
const officialStore = require('./official_store');


const { coins } = require('./coins');


module.exports = {


  list: async function () {

    return postgres.store.findAllStores();

  },



  isOfficialStore: function (store) {
    
    const { storeID, name } = store;

    return storeID === officialStore.storeID && name === officialStore.name;

  },


  findAdsFromStore: function (storeID) {

    return postgres.store.findAdsFromStore(storeID);

  },


  findAdFromStore: function (storeID, itemID) {

    return postgres.store.findAdFromStore(storeID, itemID);

  },

  buyItem: async function (user_id, item_id, store_id) {
    const adData = await postgres.store.findAdFromStore(store_id, item_id);
    if (! adData) {
      return;
    }

    // add to mongo db first
    // in case of failure, no inventory update
    // in case it works but postgres doesn't, it's better than the opposite case
    // of removing coins from the user without them getting items
    const itemData = adData.item;
    const inventoryEntry = itemData;
    const mongoResult = await mongodb.user.addToInventory(user_id, inventoryEntry);
    if (! mongoResult?.acknowledged) {
      return;
    }

    const valor = itemData.value;
    const moeda_id = itemData.coin.coinID;
    try {
    const result = await postgres.store.addTransaction(user_id, valor, moeda_id);
    }
    catch (e) {
      // rolls back inventory insertion
      mongodb.user.removeFromInventory(user_id, inventoryEntry);
    }


    return 'success;'

  },

  initializeUser: async function (user) {

    for (const coin of coins) {
      await postgres.wallet.create(user, { coin, balance: 0 });
    }

  },


};
