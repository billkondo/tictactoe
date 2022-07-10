const { faker } = require('@faker-js/faker');
const { BANNER } = require('../../domain/item_category');
const seedCategory = require('./seed_category');
const seedCoin = require('./seed_coin');
const { transform } = require('../../utils');


const seedItem = () => {
  const name = faker.music.songName();
  const itemID = transform.toURL(name);
  const description = seedDescription();
  const category = seedCategory();
  const imageUrl = category === BANNER ? faker.image.cats() : null;
  const value = faker.datatype.number({ min: 25, max: 50 });
  const coin = seedCoin();

  return {
    itemID,
    name,
    description,
    category,
    imageUrl,
    value,
    coin,
  };
};


const seedDescription = () => {
  const wordsCount = faker.datatype.number({ min: 0, max: 20 });
  const description = faker.random.words(wordsCount);

  return description;
};


module.exports = seedItem;
