const { driver, auth } = require('neo4j-driver');

class Neo4j {
  URL = 'neo4j://localhost:7687';
  USER = 'neo4j';
  PASSWORD = 'development';

  constructor() {
    this.driver = driver(this.URL, auth.basic(this.USER, this.PASSWORD));
    this.session = this.driver.session();
  }
}

module.exports = Neo4j;
