const { driver, auth } = require('neo4j-driver');


const URL = 'neo4j://localhost:7687';
const USER = 'neo4j';
const PASSWORD = 'development';


const neo4j = driver(URL, auth.basic(USER, PASSWORD));


module.exports = neo4j;
