module.exports = {


  friendlyName: 'Neo4j Query',


  description: '',


  exits: {

    success: {
      viewTemplatePath: 'pages/neo4j/query'
    }

  },


  fn: async function () {
    const userID = this.req?.user?.userID;
    const query = `MATCH (u1:User {userID: $userID})-[:FOLLOW]->(u2:User), (u2:User)-[:PLAY]->(p1:Match)
    return p1
    order by p1.data DESC`;
    const parameters = {userID : userID};
    console.log(parameters);
    const result = await sails.helpers.queryNeo4J.with({query : query, parameters : parameters });
    const lines = result.map(record => {
      return Object.values(record.get('p1').properties);
    })
    const columnNames = result.length == 0 ? [] : Object.keys(result[0].get('p1').properties);

    return {
      queryTitle : "Most recent matches of users you follow",
      lines : lines,
      columnNames : columnNames
    };
  }


};