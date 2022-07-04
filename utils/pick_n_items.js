const shuffle = require('./shuffle');


const pickNItems = (items = [], itemsToPick = 0) => {

  if (items.length < itemsToPick) throw new Error('items.length < itemsToPick');

  const itemsCopy = shuffle([...Array(items.length).keys()]);

  return itemsCopy.slice(items.length - itemsToPick);

};


module.exports = pickNItems;
