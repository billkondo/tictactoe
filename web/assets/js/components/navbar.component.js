parasails.registerComponent('navbar', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'me',
    'userData',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {

    let notificationsCount = 0;
    if (this.userData) {
      notificationsCount = this.userData.notifications.length;
    }

    return {
      notificationsCount,
    };

  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <header class="navbar navbar-expand-sm navbar-dark bg-dark flex-column flex-md-row justify-content-between" purpose="page-header">
      <a style="cursor: pointer;" class="navbar-brand mr-0" href="/"><img style="height: 20px;" class="logo" alt="NEW_APP_NAME logo" src="/images/logo.png"/></a>
      <div class="navbar-nav flex-row">

        <template v-if="me">
          <!-- LOGGED-IN NAVIGATION -->
          <a class="nav-item nav-link ml-2 ml-md-0 mr-2 mr-md-0" href="/stores"><i class="fa fa-shopping-bag"></i></a>

          <div class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown">
              <i class="fa fa-bell"></i>
              <span v-if="notificationsCount > 0" class="badge badge-primary text-white">{{ notificationsCount }}</span>
            </a>
            <div style="left: auto; right: 0; min-width: 25rem; padding: 0;" class="dropdown-menu">
              <div v-if="!notificationsCount" class="container p-3">
                <div class="row justify-content-center align-items-center">
                  <i class="fa fa-info-circle mr-2"></i> No notifications
                </div>
              </div>
              <div v-else class="list-group" style="height: 100%;">
                <div class="list-group-item" style="width: 100%;" v-for="notification in userData.notifications">
                  <notification :notification="notification"></notification>
                </div>
              </div>
            </div>
          </div>

          <a class="nav-item nav-link ml-2 ml-md-0 mr-2 mr-md-0" href="/contact">Help</a>
          <!-- Only in desktop nav -->
          <div class="nav-item dropdown d-none d-sm-block">
            <a class="nav-link" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ me.username }}</a>
            <div style="left: auto; right: 0;" class="dropdown-menu" aria-labelledby="header-account-menu-link">
              <a class="dropdown-item" href="/profile">Profile</a>
              <a class="dropdown-item" href="/account">Settings</a>
              <a class="dropdown-item" href="/logout">Sign out</a>
            </div>
          </div>
          <!-- Only in mobile nav -->
          <a class="nav-item nav-link ml-2 mr-2 d-block d-sm-none" href="/account">Account Settings</a>
          <a class="nav-item nav-link ml-2 mr-2 d-block d-sm-none" href="/logout">Sign out</a>
        </template>

        <template v-if="!me">
          <!-- LOGGED-OUT NAVIGATION -->
          <a class="nav-item nav-link ml-2 ml-md-0 mr-2" href="/faq">FAQ</a>
          <a class="nav-item nav-link ml-2 ml-md-0 mr-2" href="/login">Log in</a>
          <!-- Only in desktop nav -->
          <div class="form-inline d-none ml-2 d-md-block" >
            <a class="btn btn-outline-info" href="/signup">Sign up</a>
          </div>
          <!-- Only in mobile nav -->
          <a class="nav-item nav-link text-info ml-2 d-block d-md-none" href="/signup">Sign up</a>
        </template>
      </div>
    </header>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    //…
  },
  beforeDestroy: function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {},

});