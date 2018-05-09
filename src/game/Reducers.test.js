import { PLAYER_WHITE, PLAYER_BLACK } from './Constants';
import {
  updateHistory,
  isGameStarted,
  isGameFinished,
  updateCurrentPlayer,
} from './Reducers';
import { changePlayer, startGame, resetGame, stopGame, tickTime } from './ActionTypes';
import { BonusTimeType } from '../config/Constants';

const TEST_ACTION = { type: 'non-existing ' };

it('Should return defalt history with TEST_ACTION', () => {
  expect(updateHistory(undefined, TEST_ACTION))
    .toEqual([{ players: [90, 90] }]);
});

it('Should update time when changing first player', () => {
  expect(updateHistory(
    [{ players: [90, 90] }, { players: [86, 90] }],
    changePlayer(PLAYER_WHITE, 85, BonusTimeType.SuddenDeath, 0, 0),
  ))
    .toEqual([{ players: [90, 90] }, { players: [85, 90] }, { players: [85, 90] }]);
});

it('Should update time when changing second player', () => {
  expect(updateHistory(
    [{ players: [90, 90] }, { players: [90, 86] }],
    changePlayer(PLAYER_BLACK, 85, BonusTimeType.SuddenDeath, 0, 0),
  ))
    .toEqual([{ players: [90, 90] }, { players: [90, 85] }, { players: [90, 85] }]);
});

it('Should give no overtime if not below overtime limit', () => {
  expect(updateHistory(
    [{ players: [90, 90] }, { players: [61, 90] }],
    changePlayer(PLAYER_WHITE, 60, BonusTimeType.Overtime, 0, 45),
  ))
    .toEqual([{ players: [90, 90] }, { players: [60, 90] }, { players: [60, 90] }]);
});

it('Should reset back to overtime time when new time is less than that', () => {
  expect(updateHistory(
    [{ players: [90, 90] }, { players: [11, 90] }],
    changePlayer(PLAYER_WHITE, 10, BonusTimeType.Overtime, 0, 45),
  ))
    .toEqual([{ players: [90, 90] }, { players: [10, 90] }, { players: [45, 90] }]);
});

it('Should receive used time if less than compensation time has been spent', () => {
  expect(updateHistory(
    [{ players: [90, 90] }, { players: [89, 90] }],
    changePlayer(PLAYER_WHITE, 88, BonusTimeType.Compensation, 4, 0),
  ))
    .toEqual([{ players: [90, 90] }, { players: [88, 90] }, { players: [90, 90] }]);
});

it('Should add back whole compensation time if more has been spent', () => {
  expect(updateHistory(
    [{ players: [90, 90] }, { players: [81, 90] }],
    changePlayer(PLAYER_WHITE, 80, BonusTimeType.Compensation, 4, 0),
  ))
    .toEqual([{ players: [90, 90] }, { players: [80, 90] }, { players: [84, 90] }]);
});

it('Should tick time for player white', () => {
  expect(updateHistory([{ players: [90, 90] }], tickTime(PLAYER_WHITE, 89)))
    .toEqual([{ players: [89, 90] }]);
});

it('Should reset history with max time', () => {
  expect(updateHistory([{ players: [0, 0] }], resetGame(90)))
    .toEqual([{ players: [90, 90] }]);
});

it('It return default player with TEST_ACTION', () => {
  expect(updateCurrentPlayer(undefined, TEST_ACTION))
    .toEqual(PLAYER_WHITE);
});

it('It should start game with correct player', () => {
  expect(updateCurrentPlayer(PLAYER_WHITE, startGame(PLAYER_BLACK)))
    .toEqual(PLAYER_BLACK);
});

it('It should change current player from white to black', () => {
  expect(updateCurrentPlayer(
    PLAYER_WHITE,
    changePlayer(PLAYER_WHITE + 999, 100, BonusTimeType.SuddenDeath, 0, 0), // TODO remove + 999
  ))
    .toEqual(PLAYER_BLACK);
});

it('It should change current player from black to white', () => {
  expect(updateCurrentPlayer(
    PLAYER_BLACK,
    changePlayer(PLAYER_WHITE + 999, 100, BonusTimeType.SuddenDeath, 0, 0), // TODO remove + 999
  ))
    .toEqual(PLAYER_WHITE);
});

it('It should not start game with TEST_ACTION', () => {
  expect(isGameStarted(false, TEST_ACTION))
    .toEqual(false);
});

it('It should start game', () => {
  expect(isGameStarted(false, startGame(PLAYER_WHITE)))
    .toEqual(true);
});

it('It should reset start game', () => {
  expect(isGameStarted(false, resetGame(0)))
    .toEqual(false);
});

it('It should not stop game with TEST_ACTION', () => {
  expect(isGameFinished(false, TEST_ACTION))
    .toEqual(false);
});

it('It should stop game', () => {
  expect(isGameFinished(false, stopGame()))
    .toEqual(true);
});

it('It should reset stop game', () => {
  expect(isGameFinished(true, resetGame(0)))
    .toEqual(false);
});
