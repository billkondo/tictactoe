const postgres = require('../../databases/postgres');


module.exports = {


  create: async function (user) {
    
    const { userID, username, name, email, registerDate } = user;

    await postgres`
      INSERT INTO usuario (user_id, nome, username, email, data_de_cadastro)
      VALUES (${userID}, ${name}, ${username}, ${email}, ${registerDate})
    `;

  },


  findAll: async function () {

    const users = await postgres`SELECT * FROM usuario`;

    return users.map(this.mapUser);

  },


  findByUsername: async function (username) {

    const users = await postgres`
      SELECT * FROM usuario
      WHERE username=${username}
    `;

    if (users.length > 0)
      return this.mapUser(users[0]);

    return null;

  },


  searchByUsername: async function (username, limit=5) {

    const users = await postgres`
      SELECT * FROM usuario
      WHERE LOWER(username) LIKE LOWER(${'%' + username + '%'})
      LIMIT ${limit}
    `

    return users.map(this.mapUser);

  },


  mapUser: function (user) {

    const { user_id, nome, username, email, data_de_cadastro } = user;

    return {
      userID: user_id,
      name: nome,
      username,
      email,
      registerDate: data_de_cadastro,
    }

  }


};
