const Redis = require('../../databases/redis');

const addInvite = async (invite) => {
  const redis = new Redis();
  const inviteKey = redis.inviteKey(invite);

  await redis.connect();
  await redis.client.set(inviteKey, JSON.stringify(invite));
};

module.exports = addInvite;
