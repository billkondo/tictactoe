const pickTwoItems = require('../../utils/pick_two_items');
const userFollowsUser = require('../../domain/neo4j/user_follows_user');
const addUser = require('../../domain/neo4j/add_user');
const addMatch = require('../../domain/neo4j/add_match');
const doesUserFollowUser = require('../../domain/neo4j/does_user_follow_user');

const seed = async ({ users, matches }) => {
  const USER_FOLLOWINGS = 50;

  for (const user of users) await addUser(user);

  for (const match of matches) await addMatch(match);

  for (let i = 0; i < USER_FOLLOWINGS; i++) {
    let [userFollowing, userFollowed] = pickTwoItems(users);

    while (await doesUserFollowUser(userFollowing, userFollowed))
      [userFollowing, userFollowed] = pickTwoItems(users);

    await userFollowsUser(userFollowing, userFollowed);
  }
};

module.exports = seed;
