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

    const { matchID, player1, player2, result } = this.match;

    if (result === 'PLAYER_1_WON') {
      player1.delta = `+${player1.ratingDelta}`;
      player1.css = 'text-success';

      player2.delta = `-${player2.ratingDelta}`;
      player2.css = 'text-danger';
    } else if (result === 'PLAYER_2_WON') {
      player1.delta = `-${player1.ratingDelta}`;
      player1.css = 'text-danger';

      player2.delta = `+${player2.ratingDelta}`;
      player2.css = 'text-success';
    } else if (result === 'DRAW') {
      player1.delta = `±${player1.ratingDelta}`;
      player1.css = 'text-muted';

      player2.delta = `±${player2.ratingDelta}`;
      player2.css = 'text-muted';
    }

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
    <div class="container pt-3 pb-3">
      <a class="overlay" :href="url"></a>
      <div class="row ml-0 mr-0">
        <div class="col-3">
          <div class="d-flex justify-content-end">
            {{ player1.username }}
          </div>
          <div class="d-flex justify-content-end">
            {{ player1.rating }}
            <span class="pl-1" :class="player1.css"> {{ player1.delta }} </span>
          </div>
        </div>
        <div class="col-1 mr-4 ml-4">X</div>
        <div class="col-3">
          <div> {{ player2.username }} </div>
          <div>
            {{ player2.rating }}
            <span class="pl-1" :class="player2.css"> {{ player2.delta }} </span>
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
