const postgres = require('../../databases/postgres');


module.exports = {


  createStore: async function (store) {
    
    const { storeID, name } = store;
  
    await postgres`
      INSERT INTO loja (store_id, nome)
      VALUES (${storeID}, ${name})
    `;

  },


  createItemCategory: async function (name) {

    await postgres`
      INSERT INTO item_categoria (nome)
      VALUES (${name})
    `;

  },


};
