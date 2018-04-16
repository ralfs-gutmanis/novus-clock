import { combineReducers } from 'redux';
import {
  ENABLE_SOUND,
  ENABLE_VIBRATION,
  SET_TIMER_MAX,
} from './ActionTypes';


function enableSound(state = true, action) {
  switch (action.type) {
    case ENABLE_SOUND:
      return action.enabled;
    default:
      return state;
  }
}

function enableVibration(state = true, action) {
  switch (action.type) {
    case ENABLE_VIBRATION:
      return action.enabled;
    default:
      return state;
  }
}

function setTimerMax(state = 90, action) {
  switch (action.type) {
    case SET_TIMER_MAX:
      return action.seconds;
    default:
      return state;
  }
}

const clockApp = combineReducers({
  vibrationEnabled: enableVibration,
  soundEnabled: enableSound,
  timerMax: setTimerMax,
});

export default clockApp;
