const addUser = require('../../domain/postgres/add_user');

const seed = async ({ users }) => {
  console.info('Seed Postgres');

  console.info('  Seed Users');
  await Promise.all(users.map(addUser));
};

module.exports = seed;
