const { faker } = require('@faker-js/faker');
const {
  PLAYER_1_WON,
  PLAYER_2_WON,
  DRAW,
} = require('../../domain/match_result');
const { timeFormats } = require('../../domain/match_time_format');

const seedMatch = (firstUser, secondUser) => {
  const matchID = faker.datatype.uuid();
  const timeFormat =
    timeFormats[faker.datatype.number({ min: 0, max: timeFormats.length - 1 })];
  const startTime = faker.date.recent();
  const plays = seedPlays(timeFormat);
  const matchWinner = winner(plays);

  const findResult = () => {
    if (matchWinner === 1) return PLAYER_1_WON;
    if (matchWinner === 2) return PLAYER_2_WON;
    return DRAW;
  };

  return {
    matchID,
    timeFormat,
    startTime,
    player1: {
      username: firstUser.username,
      rating: firstUser.rating,
    },
    player2: {
      username: secondUser.username,
      rating: secondUser.rating,
    },
    result: findResult(),
    plays,
  };
};

const seedPlays = (timeFormat) => {
  const plays = [];
  const possiblePlays = [];
  let currentPlayer = 0;
  let currentTime = [timeFormat.limit, timeFormat.limit];

  for (let x = 0; x < 3; ++x)
    for (let y = 0; y < 3; ++y) possiblePlays.push([x, y]);

  while (winner(plays) === 0 && possiblePlays.length > 0) {
    const playID = faker.datatype.number({
      min: 0,
      max: possiblePlays.length - 1,
    });
    const timeElapsed = faker.datatype.float({ min: 0.5, max: 1.5 });

    currentTime[currentPlayer] = Math.max(
      currentTime[currentPlayer] - timeElapsed,
      0.0
    );
    plays.push({
      position: possiblePlays[playID],
      time: currentTime[currentPlayer],
    });
    possiblePlays.splice(playID, 1);
    currentPlayer = 1 - currentPlayer;
  }

  return plays;
};

const winner = (plays) => {
  const grid = playsToGrid(plays);
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

const playsToGrid = (plays = []) => {
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

module.exports = seedMatch;
