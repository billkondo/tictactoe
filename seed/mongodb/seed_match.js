const { faker } = require('@faker-js/faker');
const matchWinner = require('../../domain/matches/match_winner');
const {
  PLAYER_1_WON,
  PLAYER_2_WON,
  DRAW,
} = require('../../domain/match_result');

const seedPlays = require('../matches/seed_plays');
const seedTimeFormat = require('../matches/seed_time_format');

const seedMatch = (firstUser, secondUser) => {
  const matchID = faker.datatype.uuid();
  const timeFormat = seedTimeFormat();
  const startTime = faker.date.recent();
  const plays = seedPlays(timeFormat);
  const winner = matchWinner(plays);

  let result;
  let ratingDeltaPlayer1 = faker.datatype.number({ min: 1, max: 15 });
  let ratingDeltaPlayer2 = faker.datatype.number({ min: 1, max: 15 });
  switch (winner) {
    case 1:
      result = PLAYER_1_WON;
      ratingDeltaPlayer2 *= 1;
      break;
    case 2:
      result = PLAYER_2_WON;
      ratingDeltaPlayer1 *= 1;
      break;
    default:
      result = DRAW;
      ratingDeltaPlayer1 = ratingDeltaPlayer2 = 0;
  }

  return {
    matchID,
    timeFormat,
    startTime,
    player1: {
      username: firstUser.username,
      rating: firstUser.rating,
      ratingDelta: ratingDeltaPlayer1,
    },
    player2: {
      username: secondUser.username,
      rating: secondUser.rating,
      ratingDelta: ratingDeltaPlayer2,
    },
    result,
    plays,
  };
};

module.exports = seedMatch;
