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
      const query = `MATCH (u1:User {userID: $userID})-[:FOLLOW]->(u2:User), (u2:User)-[:FOLLOW]->(u3:User)
      WHERE u3 <> u1
      with count(u3) as quantosSeguem, u3, collect(u2) as following
      return u3, quantosSeguem, following
      order by quantosSeguem desc`;
      const parameters = {userID : userID};
      const result = await sails.helpers.queryNeo4J.with({query : query, parameters : parameters });
      const lines = result.map(record => {
        return [record.get('u3').properties.username, record.get('quantosSeguem'), record.get('following').map(record => record?.properties?.username).join(', ')];
      })
      const columnNames = ["User", "Amount", "Followers that you follow"];
  
      return {
        queryTitle : "Users that who you are following follow the most",
        lines : lines,
        columnNames : columnNames
      };
    }
  
  
  };