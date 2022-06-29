const { faker } = require('@faker-js/faker');

const seedUserGameData = () => {
  const rating = faker.datatype.number({ min: 1200, max: 2500 });

  return {
    rating,
    matches: 0,
    wins: 0,
    draws: 0,
    loses: 0,
  };
};

module.exports = seedUserGameData;
