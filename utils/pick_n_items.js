const { faker } = require('@faker-js/faker');

const pickNItems = (items = [], itemsToPick = 0) => {
  if (items.length < itemsToPick) throw new Error('items.length < itemsToPick');

  const pickedItems = [];
  const itemsCopy = [...items];

  while (pickedItems.length < itemsToPick) {
    const id = faker.datatype.number({ min: 0, max: itemsCopy.length - 1 });

    pickedItems.push(id);
    itemsCopy.splice(id, 1);
  }

  return pickedItems;
};

module.exports = pickNItems;
