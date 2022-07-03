const postgres = require('../../databases/postgres');


module.exports = {


  create: async function (user) {
    
    const { userID, username, name, email, registerDate } = user;

    await postgres`
      INSERT INTO usuario (user_id, nome, username, email, data_de_cadastro)
      VALUES (${userID}, ${name}, ${username}, ${email}, ${registerDate})
    `;

  },


  findByUsername: async function (username) {

    const users = await postgres`
      SELECT * FROM usuario
      WHERE username=${username}
    `;

    if (users.length > 0)
      return users[0];

    return null;

  },


};
