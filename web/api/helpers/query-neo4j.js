module.exports = {


    friendlyName: 'Query Neo4j',
  
  
    description: '',
  
  
    inputs: {
  
      query : {
        type: 'string',
        required : true,
      },
      parameters : {
        type : {},
        defaultsTo : {},
        required: false
      }
    },
  
  
    fn: async function ({ query, parameters}) {
        const neo4j = require('neo4j-driver')
    
        const uri = `bolt://0.0.0.0:7687/`;
        const user = 'neo4j';
        const password = 'development';
        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
        const session = driver.session()
        
        let result = null;
        try {
          result = await session.run(
            query,
            parameters
          )
        } finally {
          await session.close()
        }
        if (! result) {
            return [];
        }
    
        // on application exit:
        await driver.close()
    
        return result.records;
    }
  
  
  };