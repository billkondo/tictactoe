const { faker } = require('@faker-js/faker');

const pickTwoItems = (array = []) => {
  const N = array.length;

  if (N < 2) throw new Error('array has less than 2 items');

  const firstItem = pickItem(array);
  let secondItem = pickItem(array);

  while (secondItem === firstItem) secondItem = pickItem(array);

  return [array[firstItem], array[secondItem]];
};

const pickItem = (array = []) =>
  faker.datatype.number({ min: 0, max: array.length - 1 });

module.exports = pickTwoItems;
