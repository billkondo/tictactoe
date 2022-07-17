const pickTwoItems = require('../../../utils/pick_two_items');

const seedInvite = require('./seed_invite');


const seedInvites = async (invitesCount, users) => {

  const invites = [];

  for (let i = 0; i < invitesCount; ++i) {
    const [user1, user2] = pickTwoItems(users);
    const { invite } = await seedInvite(users[user1], users[user2]);

    invites.push(invite);
  }

  return invites;

};


module.exports = seedInvites;
