module.exports = {


  friendlyName: 'View items',


  description: 'Display "Items" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/stores/items'
    }

  },


  fn: async function () {

    const { name } = this.req.params;
    const storeName = sails.appUtils.transform.fromURL(name);
    const ads = await sails.appDomain.store.findAdsFromStore(storeName);

    return {
      ads,
      storeName,
    };

  },


};
