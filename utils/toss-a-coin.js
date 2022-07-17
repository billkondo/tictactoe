const { faker } = require('@faker-js/faker');


function tossACoin() {

  return faker.datatype.boolean();

};


module.exports = tossACoin;