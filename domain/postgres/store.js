const postgres = require('../../databases/postgres');


module.exports = {


  createStore: async function (store) {
    
    const { storeID, name, description } = store;
  
    await postgres`
      INSERT INTO loja (store_id, nome, descricao)
      VALUES (${storeID}, ${name}, ${description})
    `;

  },


  createCoin: async function (coin) {

    const { coinID, name, iconCSSClass } = coin;

    await postgres`
      INSERT INTO moeda (coin_id, nome, classe_css)
      VALUES (${coinID}, ${name}, ${iconCSSClass})
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
      INSERT INTO item (
        item_id,
        nome,
        descricao,
        categoria,
        valor,
        moeda_id,
        moeda_nome,
        moeda_classe_css,
        url
      )
      VALUES (
        ${itemID},
        ${name},
        ${description},
        ${category},
        ${value},
        ${coin.coinID},
        ${coin.name},
        ${coin.iconCSSClass},
        ${imageUrl}
      )
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


  findAllStores: async function () {

    const stores = await postgres`SELECT * FROM loja`;

    return stores.map(this.mapStore);

  },


  findAdQuery: postgres`
    SELECT
      loja.store_id as store_id,
      loja.nome as loja_nome,
      loja.descricao as loja_descricao,
      item.item_id as item_id,
      item.nome as item_nome,
      item.descricao as item_descricao,
      item.categoria as item_categoria,
      item.valor as item_valor,
      item.moeda_id as item_moeda_id,
      item.moeda_nome as item_moeda_nome,
      item.moeda_classe_css as item_moeda_classe_css,
      item.url as item_url,
      anuncia.data_de_inicio,
      anuncia.data_de_termino,
      anuncia.valor_promocional
    FROM anuncia 
    INNER JOIN item ON item.item_id = anuncia.item_id
    INNER JOIN loja ON loja.store_id = anuncia.store_id
  `,


  findAdsFromStore: async function (storeID) {
    
    const ads = await postgres`
      ${this.findAdQuery}
      WHERE loja.store_id=${storeID}
    `;

    return ads.map(this.mapAd);

  },


  findAdFromStore: async function (storeID, itemID) {

    const ad = await postgres`
      ${this.findAdQuery}
      WHERE loja.store_id=${storeID} AND item.item_id=${itemID}
    `;

    return this.mapAd(ad[0]);

  },

  addTransaction : async function (user_id, valor, moeda_id) {
    const result = postgres`
    CALL addTransaction(${user_id}, ${valor}, ${moeda_id});
    `;
    return result;
  },


  mapStore: function (store) {

    const { store_id, nome, descricao } = store;

    return {
      storeID: store_id,
      name: nome,
      description: descricao,
    };

  },

  
  mapAd: function (ad) {
    
    const { store_id, loja_nome, loja_descricao } = ad;
    const store = {
      storeID: store_id,
      name: loja_nome,
      description: loja_descricao,
    };

    const { 
      item_id,
      item_nome,
      item_descricao,
      item_categoria,
      item_valor,
      item_moeda_id,
      item_moeda_nome,
      item_moeda_classe_css,
      item_url
    } = ad;
    const item = {
      itemID: item_id,
      name: item_nome,
      description: item_descricao,
      category: item_categoria,
      value: item_valor,
      coin: {
        coinID: item_moeda_id,
        name: item_moeda_nome,
        iconCSSClass: item_moeda_classe_css,
      },
      imageUrl: item_url,
    };

    const { data_de_inicio, data_de_termino, valor_promocional } = ad;

    return {
      store,
      item,
      startTime: data_de_inicio,
      endTime: data_de_termino,
      promoValue: valor_promocional,
    };

  },


};
