const { faker } = require('@faker-js/faker');
const { BANNER } = require('../../domain/item_category');
const seedCategory = require('./seed_category');

const seedItem = () => {
  const itemID = faker.datatype.uuid();
  const name = faker.music.songName();
  const category = seedCategory();
  const imageUrl = category === BANNER ? faker.image.cats() : null;

  return {
    itemID,
    name,
    category,
    imageUrl,
  };
};

module.exports = seedItem;
