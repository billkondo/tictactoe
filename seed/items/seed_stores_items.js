const { faker } = require('@faker-js/faker');
const officialStore = require('../../domain/store/official_store');
const pickNItems = require('../../utils/pick_n_items');


const seedStoreItems = (stores, items) => {
  
  const storeItems = [];

  for (const store of stores) {
    const isOfficial = (store === officialStore);

    if (isOfficial) {
      storeItems.push({
        store,
        items: items.map(seedStoreItem),
      });
    } else {
      const itemsCount = faker.datatype.number({ min: 5, max: Math.max(5, items.length - 5) });
      const itemsIndexes = pickNItems(items, itemsCount);
      
      storeItems.push({
        store,
        items: itemsIndexes.map(index => seedStoreItem(items[index])),
      });
    }
  }

  return storeItems;
};


const seedStoreItem = (item) => {
  
  const startTime = faker.date.past();
  const endTime = faker.datatype.boolean() ? faker.date.recent() : null;
  const promoValue = faker.datatype.boolean() ? faker.datatype.number({ min: 5, max: Math.max(5, item.value - 10) }) : null;

  return {
    ...item,
    startTime,
    endTime,
    promoValue,
  };

};


module.exports = seedStoreItems;
