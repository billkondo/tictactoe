const neo4j = require('../../databases/neo4j');


module.exports = {


  create: async function (user, userGameData) {

    const { userID, username } = user;
    const { rating } = userGameData;

    await neo4j.session().run(`
      CREATE (user:User { 
        userID: "${userID}", 
        username: "${username}",
        rating: ${rating}
      })
    `);

  },


  exists: async function (username) {

    const query = await neo4j.session().run(`
      MATCH (user: User)
      WHERE user.username = "${username}"
      RETURN user
    `);

    return query.records.length > 0;

  },


  validateUserExists: async function (username) {
    
    if (!(await this.exists(username))) {
      throw new Error(f`${username} does not exist in Neo4j`);
    }

  },


};
