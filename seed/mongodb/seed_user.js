const { faker } = require('@faker-js/faker');

const seedUser = () => {
  const rating = faker.datatype.number({ min: 1000, max: 2500 });

  return {
    userID: faker.datatype.uuid(),
    username: faker.internet.userName(),
    rating,
    banner: null,
    followersCount: 0,
    inventory: [],
  };
};

module.exports = seedUser;
