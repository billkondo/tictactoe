const pickNItems = require('./pick_n_items');

const pickItem = (items = []) => pickNItems(items, 1);

module.exports = pickItem;
