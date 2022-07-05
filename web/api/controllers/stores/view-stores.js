module.exports = {


  friendlyName: 'View stores',


  description: 'Display "Stores" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/stores/stores'
    }

  },

  fn: async function () {

    const stores = await sails.appDomain.store.list();
    const storesModels = stores.map(store => ({
      ...store,
      url: `/stores/items/${store.storeID}`,
      isOfficial: sails.appDomain.store.isOfficialStore(store),
    }));

    // Move official store to beginning
    const officialStore = storesModels.filter(storeModel => storeModel.isOfficial);
    const otherStores = storesModels.filter(storeModel => !storeModel.isOfficial);

    return {
      stores: officialStore.concat(otherStores),
    };

  },


};
