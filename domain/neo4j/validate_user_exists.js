const userExists = require('./user_exists');

const validateUserExists = async (username) => {
  if (!(await userExists(username)))
    throw new Error(f`${username} does not exist in Neo4j`);
};

module.exports = validateUserExists;
