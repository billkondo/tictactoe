const pickTwoItems = require('../../../utils/pick_two_items');

const seedInvite = require('./seed_invite');


const seedInvites = async (invitesCount, usersData) => {

  const invites = [];

  for (let i = 0; i < invitesCount; ++i) {
    const [user1, user2] = pickTwoItems(usersData);
    const { invite } = await seedInvite(usersData[user1], usersData[user2]);

    invites.push(invite);
  }

  return invites;

};


module.exports = seedInvites;
