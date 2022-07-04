const mongodb = require('./mongodb');


module.exports = {


  userMatches: async function (user) {

    return mongodb.match.userMatches(user);

  },


}
