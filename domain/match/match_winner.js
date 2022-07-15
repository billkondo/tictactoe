const matchGridFromPlays = require('./match_grid_from_plays');

function matchWinner (plays = []) {
  const grid = matchGridFromPlays(plays);
  const winningPositions = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  let currentPlayer = 0;
  for (const play of plays) {
    const time = play.time;

    if (!time) return 1 - currentPlayer;

    currentPlayer = 1 - currentPlayer;
  }

  for (const winningPosition of winningPositions) {
    const marks = {
      X: 0,
      O: 0,
      '': 0,
    };

    for (const position of winningPosition) {
      const [x, y] = position;

      marks[grid[x][y]] += 1;
    }

    if (marks['O'] === 3) return 1;
    if (marks['X'] === 3) return 2;
  }

  return 0;
};

module.exports = matchWinner;
