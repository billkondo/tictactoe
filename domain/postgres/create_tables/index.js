const postgres = require('../../../databases/postgres');
const path = require('path');

const createTables = async () => {
  const filePath = path.join(__dirname, 'script.sql');

  await postgres.file(filePath);
};

module.exports = createTables;
