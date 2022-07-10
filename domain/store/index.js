const postgres = require('../postgres');
const officialStore = require('./official_store');


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


};
