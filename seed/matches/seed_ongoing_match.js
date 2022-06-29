const { faker } = require('@faker-js/faker');

const { ONGOING } = require('../../domain/match_result');
const seedPlays = require('./seed_plays');
const seedTimeFormat = require('./seed_time_format');

const seedOngoingMatch = (
  firstUser,
  firstUserGameData,
  secondUser,
  secondUserGameData
) => {
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
      username: firstUser.username,
      rating: firstUserGameData.rating,
    },
    player2: {
      username: secondUser.username,
      rating: secondUserGameData.rating,
    },
    result: ONGOING,
    plays,
  };
};

module.exports = seedOngoingMatch;
