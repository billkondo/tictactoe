parasails.registerComponent('game-card', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'match',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {

    const { matchID, player1, player2 } = this.match;

    return {
      player1,
      player2,
      url: `/match/${matchID}`,
    };

  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="game-card">
      <div class="container pt-3 pb-3 card">
        <a class="overlay" :href="url"></a>
        <div class="row ml-0 mr-0">
          <div class="col-3">
            <board :match="match"></board>
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-4">
                <div class="d-flex justify-content-end">
                  {{ player1.username }}
                </div>
                <div class="rating d-flex justify-content-end">
                  {{ player1.rating }}
                  <span class="pl-1">
                    <rating-change :rating-delta="player1.ratingDelta" />
                  </span>
                </div>
              </div>
              <div class="col-2 row justify-content-center align-items-center">X</div>
              <div class="col-4">
                <div>
                  {{ player2.username }}
                </div>
                <div class="rating">
                  {{ player2.rating }}
                  <span class="pl-1">
                    <rating-change :rating-delta="player2.ratingDelta" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  methods: {}

});
