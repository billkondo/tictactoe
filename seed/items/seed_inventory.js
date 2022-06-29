const { faker } = require('@faker-js/faker');

const seedBanner = require('./seed_banner');
const pickNItems = require('../../utils/pick_n_items');

const seedInventory = (usersInventoryData = [], items = []) => {
  for (let i = 0; i < usersInventoryData.length; i++) {
    const userHasInventoryFilled = faker.datatype.boolean();

    if (userHasInventoryFilled) {
      const itemsInInventoryCount = faker.datatype.number({
        min: 1,
        max: items.length - 1,
      });
      const inventory = pickNItems(items, itemsInInventoryCount).map(
        (itemIndex) => items[itemIndex]
      );

      usersInventoryData[i].inventory.push(...inventory);
      usersInventoryData[i].banner = seedBanner(inventory);
    }
  }
};

module.exports = seedInventory;
