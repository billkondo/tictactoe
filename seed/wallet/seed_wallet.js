const { faker } = require('@faker-js/faker');

const seedWallet = (coin) => {

  const balance = faker.datatype.number({ min: 0, max: 75 });

  return {
    balance,
    coin,
  };

};

module.exports = seedWallet;
