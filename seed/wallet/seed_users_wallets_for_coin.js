const seedWallet = require('./seed_wallet');

const seedUsersWalletsForCoins = (users, coin) => {

  return users.map(() => seedWallet(coin));
  
};

module.exports = seedUsersWalletsForCoins;
