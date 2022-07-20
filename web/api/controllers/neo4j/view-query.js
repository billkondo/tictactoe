module.exports = {


    friendlyName: 'Neo4j Query',
  
  
    description: '',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/neo4j/query'
      }
  
    },
  
  
    fn: async function () {
      const query = `MATCH (u1:User)-[r:FOLLOW]->(u2:User)
      with u2, count(u1) as howManyFollowers
      return howManyFollowers, u2
      order by howManyFollowers DESC, u2.rating DESC
      limit 25`;
      const parameters = {};
      const result = await sails.helpers.queryNeo4J.with({query : query, parameters : parameters });
      const lines = result.map(record => {
        return [record.get('u2').properties.username, record.get('howManyFollowers'), record.get('u2').properties.rating];
      })
      const columnNames = ["User", "Followers", "Rating"];
  
      return {
        queryTitle : "Users with the highest number of followers",
        lines : lines,
        columnNames : columnNames
      };
    }
  
  
  };
  