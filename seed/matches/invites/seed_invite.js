const { faker } = require('@faker-js/faker');

const match = require('../../../domain/match');
const seedTimeFormat = require('../seed_time_format');


const seedInvite = async (sender, receiver) => {
  
  const timeFormat = seedTimeFormat();
  const sentTime = faker.date.recent();

  return await match.createInvite({timeFormat, sender, receiver, sentTime });

};


module.exports = seedInvite;
