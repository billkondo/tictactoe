module.exports = {


  friendlyName: 'View invite',


  description: 'Display "Invite" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invite/invite'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
