const Postgres = require('postgres');

const URL = 'postgres://admin:admin@localhost:5432/tic-tac-toe';
const postgres = Postgres(URL);

postgres.dropSchema = async () => {
  await postgres`
    DROP SCHEMA public CASCADE
  `;
};

postgres.createSchema = async () => {
  await postgres`
    CREATE SCHEMA public
  `;
};

module.exports = postgres;
