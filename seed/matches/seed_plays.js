const { faker } = require('@faker-js/faker');
const matchWinner = require('../../domain/matches/match_winner');

const seedPlays = (timeFormat) => {
  const plays = [];
  const possiblePlays = [];
  let currentPlayer = 0;
  let currentTime = [timeFormat.limit, timeFormat.limit];

  for (let x = 0; x < 3; ++x)
    for (let y = 0; y < 3; ++y) possiblePlays.push([x, y]);

  while (matchWinner(plays) === 0 && possiblePlays.length > 0) {
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

module.exports = seedPlays;
