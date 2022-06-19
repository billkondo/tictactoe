const matchGridFromPlays = (plays) => {
  const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let currentPlayer = 0;
  for (const play of plays) {
    const [x, y] = play.position;
    const symbol = currentPlayer === 0 ? 'O' : 'X';

    grid[x][y] = symbol;
    currentPlayer = 1 - currentPlayer;
  }

  return grid;
};

module.exports = matchGridFromPlays;
