const { faker } = require('@faker-js/faker');
const { timeFormats } = require('../../domain/match_time_format');

const seedTimeFormat = () =>
  timeFormats[faker.datatype.number({ min: 0, max: timeFormats.length - 1 })];

module.exports = seedTimeFormat;
