module.exports = {


  friendlyName: 'View items',


  description: 'Display "Items" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/stores/items'
    }

  },


  fn: async function () {

    const { storeID } = this.req.params;
    const ads = await sails.appDomain.store.findAdsFromStore(storeID);

    for (let i = 0; i < ads.length; i++) {
      ads[i].item.url = `/stores/items/${storeID}/${ads[i].item.itemID}`;
    }

    return {
      ads,
      storeName: ads.length > 0 ? ads[0].store.name : '',
    };

  },


};
