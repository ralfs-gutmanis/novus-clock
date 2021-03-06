import update from 'immutability-helper';
import * as Actions from './ActionTypes';
import { PLAYER_WHITE, PLAYER_BLACK } from './Constants';
import { BonusTimeType } from '../config/Constants';

export function updateCurrentPlayer(state = PLAYER_WHITE, action) {
  switch (action.type) {
    case Actions.CHANGE_PLAYER:
      if (state === PLAYER_WHITE) {
        return PLAYER_BLACK;
      }

      return PLAYER_WHITE;
    case Actions.START_GAME:
      return action.currentPlayerIndex;
    default:
      return state;
  }
}

export function updateHistory(state = [{ players: [90, 90] }], action) {
  const currentIndex = state.length - 1;

  switch (action.type) {
    case Actions.TICK_TIME:
      return update(state, {
        [currentIndex]: { players: { [action.currentPlayerIndex]: { $set: action.newTime } } },
      });
    case Actions.START_GAME: {
      const newEntry = Object.assign({}, {
        players: state[currentIndex].players.slice(),
      });

      return state.concat(newEntry);
    }
    case Actions.CHANGE_PLAYER: {
      const newEntry = Object.assign({}, {
        players: state[currentIndex].players.slice(),
      });
      let { newTime } = action;
      const oldTime = state[currentIndex - 1].players[action.currentPlayerIndex];

      if (action.bonusTimeType === BonusTimeType.Overtime &&
        newTime < action.overtimeTime
      ) {
        newTime = action.overtimeTime;
      }

      if (action.bonusTimeType === BonusTimeType.Compensation) {
        newTime = Math.min(oldTime, newTime + action.compensationTime);
      }

      newEntry.players[action.currentPlayerIndex] = newTime;
      return update(state, {
        [currentIndex]: { players: { [action.currentPlayerIndex]: { $set: action.newTime } } },
      }).concat(newEntry);
    }
    case Actions.RESET_GAME:
      return [{ players: [action.maxTime, action.maxTime] }];
    default:
      return state;
  }
}

export function isGameStarted(state = false, action) {
  switch (action.type) {
    case Actions.START_GAME:
      return true;
    case Actions.RESET_GAME:
      return false;
    default:
      return state;
  }
}

export function isGameFinished(state = false, action) {
  switch (action.type) {
    case Actions.STOP_GAME:
      return true;
    case Actions.RESET_GAME:
      return false;
    default:
      return state;
  }
}
