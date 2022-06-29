const { BANNER } = require('../../domain/item_category');
const pickItem = require('../../utils/pick_item');

const seedBanner = (inventory = []) => {
  const banners = inventory.filter((item) => item.category === BANNER);

  if (!banners.length) return null;

  return banners[pickItem(banners)];
};

module.exports = seedBanner;
