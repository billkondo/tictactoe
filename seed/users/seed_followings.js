const pickTwoItems = require('../../utils/pick_two_items');

const seedFollowings = (followingsCount, users, usersSocialData) => {
  const followings = {};

  for (let i = 0; i < followingsCount; ++i) {
    let [user1, user2] = pickTwoItems(users);

    while (followings[[user1, user2]]) [user1, user2] = pickTwoItems(users);

    followings[[user1, user2]] = 1;

    usersSocialData[user1].followingCount += 1;
    usersSocialData[user2].followersCount += 1;
  }

  return Object.keys(followings).map((pair) =>
    pair.split(',').map((id) => parseInt(id))
  );
};

module.exports = seedFollowings;
