const postgres = require('../../databases/postgres');


module.exports = {


  createItemCategory: async function (name) {

    await postgres`
      INSERT INTO item_categoria (nome)
      VALUES (${name})
    `;

  },


};
