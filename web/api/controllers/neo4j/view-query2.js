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

    const result = await sails.helpers.queryNeo4J.with({query : query, parameters : parameters });
    const matchIDs = result.map(record => record.get('p1')?.properties?.matchID);

    const matches = await Promise.all(matchIDs.map(matchID => sails.appDomain.match.findMatch(matchID) ?? {player1: undefined, player2: undefined}));
    const players = matches.map(match => [match.player1.username, match.player2.username]);

    const lines = result.map((record, index) => {
      const [player1, player2] = players[index];
      return [player1, player2, ...Object.values(record.get('p1').properties)];
    })
    const columnNames = result.length == 0 ? [] : ['player1', 'player2', ...(Object.keys(result[0].get('p1').properties))];

    return {
      queryTitle : "Most recent matches of users you follow",
      lines : lines,
      columnNames : columnNames
    };
  }


};