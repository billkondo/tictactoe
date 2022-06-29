const pickNItems = require('./pick_n_items');

const pickTwoItems = (items = []) => pickNItems(items, 2);

module.exports = pickTwoItems;
