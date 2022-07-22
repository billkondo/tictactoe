module.exports = {


  friendlyName: 'View item',


  description: 'Display "Item" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/stores/item'
    }

  },


  fn: async function () {

    const { storeID, itemID } = this.req.params;
    const ad = await sails.appDomain.store.findAdFromStore(storeID, itemID);

    return {
      ad,
      storeName: ad.store.name,
      storeURL: `/stores/items/${ad.store.storeID}`,
      itemName: ad.item.name,
      itemID : itemID,
      storeID : storeID
    };

  }


};
