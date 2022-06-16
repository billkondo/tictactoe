const { faker } = require('@faker-js/faker');
const { itemCategories, BANNER } = require('../../domain/item_category');

const seedItem = () => {
  const category =
    itemCategories[
      faker.datatype.number({ min: 0, max: itemCategories.length - 1 })
    ];
  const imageUrl = category === BANNER ? faker.image.cats() : null;

  return {
    itemID: faker.datatype.uuid(),
    name: faker.music.songName(),
    category,
    imageUrl,
  };
};

module.exports = seedItem;
