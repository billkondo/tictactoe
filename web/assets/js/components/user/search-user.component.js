parasails.registerComponent('search-user', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'error',
    'user',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {

    return {

      formData: {
        username: '',
      },

      users: [],

      focused: false,

    };

  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="search-user">
      <ajax-form action="searchUser" :formData="formData" ref="form" @submitted="submittedForm">
        <div class="form-group username-input-group">
          <label for="username-input">Invite user</label>
          <input
            type="text"
            class="form-control dropdown-toggle"
            id="username-input"
            v-model="formData.username"
            placeholder="Search by username"
            @focus="focused=true"
            @blur="closeDropdown"
            :class="[error ? 'is-invalid' : '']"
          />
          <div class="invalid-feedback" v-if="error">Please select an user.</div>
          <div class="dropdown-menu" :class="[showDropdown ? 'show' : '']">
            <h6 class="dropdown-header">Users found</h6>
            <div v-for="user in users" class="dropdown-item" @mousedown="setUser(user)">
              {{ user.username }}
            </div>
          </div>
        </div>
      </ajax-form>
    </div>
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
  methods: {

    search: _.debounce(async function () {
      this.$refs.form.submit();
    }, 300),

    submittedForm: function ({users}) {

      this.users = users;

    },

    setUser: function (user) {

      const { username } = user;

      this.formData = {
        ...this.formData,
        username,
      };

      this.$emit('selected-user', user);

      // Close dropdown
      this.focused = false;

    },

    closeDropdown: function () {
      // Need to delay in order to setUser be completed before closing the dropdown
      setTimeout(() => {
        if (this.user) {
          this.formData = {
            ...this.formData,
            username: this.user.username,
          };
        } else {
          this.formData = {
            ...this.formData,
            username: '',
          };
        }

        this.focused = false;
      }, 200);
    },

  },

  watch: {

    'formData.username'(username) {
      this.formData = {
        ...this.formData,
        username,
      };

      if (username) {
        this.search();
      }
    },

  },

  computed: {
    showDropdown() {
      return this.focused && this.formData.username.length > 0;
    }
  },

});
