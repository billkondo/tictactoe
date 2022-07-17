const { faker } = require('@faker-js/faker');


function generateUUID() {

  return faker.datatype.uuid();
  
}


module.exports = generateUUID;
