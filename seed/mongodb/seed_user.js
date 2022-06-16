const { faker } = require('@faker-js/faker');

const seedUser = () => {
  return {
    userID: faker.datatype.uuid(),
    username: faker.internet.userName(),
    banner: null,
    followersCount: 0,
    inventory: [],
  };
};

module.exports = seedUser;
