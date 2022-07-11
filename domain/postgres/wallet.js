const postgres = require('../../databases/postgres');


module.exports = {


  create: async function (user, wallet) {

    const { userID } = user;
    const { balance } = wallet;
    const { coinID } = wallet.coin;

    await postgres`
      INSERT INTO carteira (user_id, coin_id, saldo)
      VALUES (${userID}, ${coinID}, ${balance})
    `;

  },


  fromUser: async function (user) {

    const { userID } = user;
    const wallets = await postgres`
      SELECT
        carteira.coin_id as coin_id,
        carteira.saldo as saldo,
        moeda.nome as moeda_nome,
        moeda.classe_css as moeda_classe_css
      FROM carteira
      INNER JOIN moeda ON moeda.coin_id = carteira.coin_id
      WHERE carteira.user_id=${userID}
    `;

    return wallets.map(this.mapWallet);

  },


  mapWallet: function (wallet) {

    const { moeda_nome, moeda_classe_css, coin_id } = wallet;
    const coin = {
      coinID: coin_id,
      name: moeda_nome,
      iconCSSClass: moeda_classe_css,
    }

    const { saldo } = wallet;

    return {
      balance: saldo,
      coin,
    };

  },


};
