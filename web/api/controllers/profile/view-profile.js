module.exports = {


  friendlyName: 'View profile',


  description: 'Display "Profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/profile/profile'
    }

  },


  fn: async function () {

    const matches = await sails.appDomain.match.userMatches(this.req.user);

    return {
      matches: matches.map(match => ({
        ...match,
        grid: sails.appDomain.match.matchGridFromPlays(match.plays),
      })),
      matchesCount: matches.length,
    };

  }


};
