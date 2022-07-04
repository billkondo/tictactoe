const { coins } = require('../../domain/store/coins');
const pickItem = require('../../utils/pick_item');


const seedCoin = () => {
  const [ coinIndex ] = pickItem(coins);

  return coins[coinIndex];
};


module.exports = seedCoin;