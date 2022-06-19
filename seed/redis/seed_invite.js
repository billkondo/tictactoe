const { faker } = require('@faker-js/faker');
const seedTimeFormat = require('../matches/seed_time_format');

const seedInvite = (sender, receiver) => {
  const timeFormat = seedTimeFormat();
  const sendTime = faker.date.recent();

  return {
    senderID: sender.userID,
    receiverID: receiver.userID,
    timeFormat,
    sendTime,
  };
};

module.exports = seedInvite;
