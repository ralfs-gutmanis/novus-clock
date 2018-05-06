import { updateHistory } from './Reducers';
import { changePlayer } from './ActionTypes';

it('Should update time when changing first player', () => {
  expect(updateHistory([{ players: [90, 90] }], changePlayer(0, 85, 0)))
    .toEqual([{ players: [90, 90] }, { players: [85, 90] }]);
});

it('Should update time when changing second player', () => {
  expect(updateHistory([{ players: [90, 90] }], changePlayer(1, 85, 0)))
    .toEqual([{ players: [90, 90] }, { players: [90, 85] }]);
});

it('Should reset back to minimum time when new time is less than that', () => {
  expect(updateHistory([{ players: [90, 90] }], changePlayer(0, 85, 86)))
    .toEqual([{ players: [90, 90] }, { players: [86, 90] }]);
});
