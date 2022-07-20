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
      with u3, count(u3) as quantosSeguem
      return u3
      order by quantosSeguem desc`;
      const parameters = {userID : userID};
      console.log(parameters);
      const result = await sails.helpers.queryNeo4J.with({query : query, parameters : parameters });
      const lines = result.map(record => {
        return [record.get('u3').properties.username];
      })
      const columnNames = ["User"];
  
      return {
        queryTitle : "Users that who you are following follows the most",
        lines : lines,
        columnNames : columnNames
      };
    }
  
  
  };