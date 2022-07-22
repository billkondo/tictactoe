module.exports = {


  friendlyName: 'View profile',


  description: 'Display "Profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/profile/profile'
    }

  },


  fn: async function () {

    const matches = await sails.appDomain.match.userMatches(this.req.user);
    const user = await sails.appDomain.user.findByUsernameMongo(this.req.user.username);
    const inventory = user?.inventory ?? [];
    const inventoryDisplayedValues = inventory.map(x => {
      return {};
    });
    inventory.forEach((item, index) => {
      ['name', 'description', 'value'].forEach(key => {
          inventoryDisplayedValues[index][key] = item[key];
      });
      inventoryDisplayedValues[index]['coinID'] = item?.coin?.coinID;
    })

    return {
      matches,
      matchesCount: matches.length,
      inventory: inventoryDisplayedValues,
    };

  }


};
