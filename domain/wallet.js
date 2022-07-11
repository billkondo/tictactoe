const postgres = require('./postgres');

module.exports = {


  addWallet: async function (user, wallet) {

    await postgres.wallet.create(user, wallet);

  },


  fromUser: async function (user) {

    return postgres.wallet.fromUser(user);

  },


};
