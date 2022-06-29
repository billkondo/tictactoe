const { faker } = require('@faker-js/faker');

const { itemCategories } = require('../../domain/item_category');

const seedCategory = () => {
  return itemCategories[
    faker.datatype.number({ min: 0, max: itemCategories.length - 1 })
  ];
};

module.exports = seedCategory;
