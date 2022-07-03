const postgres = require('../../domain/postgres');


module.exports = async function ({ users }) {

  console.info('Seed Postgres');

  console.info('  Seed Users');
  await Promise.all(users.map(postgres.user.create));

};
