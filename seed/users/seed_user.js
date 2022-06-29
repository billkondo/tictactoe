const { faker } = require('@faker-js/faker');

const seedUser = () => {
  const userID = faker.datatype.uuid();
  const username = faker.internet.userName();
  const name = faker.name.findName();
  const email = faker.internet.email();
  const registerDate = faker.date.recent();

  return {
    userID,
    username,
    name,
    email,
    registerDate,
  };
};

module.exports = seedUser;
