const { faker } = require('@faker-js/faker');
const { ONGOING } = require('../../domain/match_result');
const seedPlays = require('../matches/seed_plays');
const seedTimeFormat = require('../matches/seed_time_format');

const seedOngoingMatch = (player1, player2) => {
  const matchID = faker.datatype.uuid();
  const timeFormat = seedTimeFormat();
  const plays = seedPlays(timeFormat);
  const onGoingMatchPlaysCount = faker.datatype.number({
    min: 1,
    max: plays.length - 2,
  });
  const onGoingMatchPlays = [];
  const startTime = faker.date.recent();

  for (let i = 0; i < onGoingMatchPlaysCount; ++i)
    onGoingMatchPlays.push(plays[i]);

  return {
    matchID,
    timeFormat,
    startTime,
    player1: {
      username: player1.username,
      rating: player1.rating,
    },
    player2: {
      username: player2.username,
      rating: player2.rating,
    },
    result: ONGOING,
    plays,
  };
};

module.exports = seedOngoingMatch;
