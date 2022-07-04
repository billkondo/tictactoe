const postgres = require('../../databases/postgres');


module.exports = {


  createStore: async function (store) {
    
    const { storeID, name } = store;
  
    await postgres`
      INSERT INTO loja (store_id, nome)
      VALUES (${storeID}, ${name})
    `;

  },


  createCoin: async function (coin) {

    const { coinID, name } = coin;

    await postgres`
      INSERT INTO moeda (coin_id, nome)
      VALUES (${coinID}, ${name})
    `;

  },


  createItemCategory: async function (name) {

    await postgres`
      INSERT INTO item_categoria (nome)
      VALUES (${name})
    `;

  },


  createItem: async function (item) {

    const { itemID, name, description, category, imageUrl, value, coin } = item;

    await postgres`
      INSERT INTO item (item_id, nome, descricao, categoria, valor, moeda_id, moeda_nome, url)
      VALUES (${itemID}, ${name}, ${description}, ${category}, ${value}, ${coin.coinID}, ${coin.name}, ${imageUrl})
    `;

  },


  addItemToStore: async function (item, store, startTime, endTime, promoValue) {

    const { storeID } = store;
    const { itemID } = item;

    await postgres`
      INSERT INTO anuncia (store_id, item_id, data_de_inicio, data_de_termino, valor_promocional)
      VALUES (${storeID}, ${itemID}, ${startTime}, ${endTime}, ${promoValue})
    `;

  },


};
