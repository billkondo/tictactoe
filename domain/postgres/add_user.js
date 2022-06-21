const postgres = require('../../databases/postgres');

const addUser = async (user) => {
  const { userID, username, name, email, registerDate } = user;

  await postgres`
    INSERT INTO usuario (user_id, nome, username, email, data_de_cadastro)
    VALUES (${userID}, ${name}, ${username}, ${email}, ${registerDate})
  `;
};

module.exports = addUser;
