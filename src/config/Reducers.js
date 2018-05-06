import {
  ENABLE_SOUND,
  ENABLE_VIBRATION,
  SET_TIMER_MAX,
  SET_BONUS_TIME,
  SET_MINIMUM_TIME,
} from './ActionTypes';


export function enableSound(state = true, action) {
  switch (action.type) {
    case ENABLE_SOUND:
      return action.enabled;
    default:
      return state;
  }
}

export function enableVibration(state = true, action) {
  switch (action.type) {
    case ENABLE_VIBRATION:
      return action.enabled;
    default:
      return state;
  }
}

export function setTimerMax(state = 90, action) {
  switch (action.type) {
    case SET_TIMER_MAX:
      if (action.seconds == null || action.seconds < 0) {
        return 0;
      }
      return action.seconds;
    default:
      return state;
  }
}

export function setBonusTime(state = 0, action) {
  switch (action.type) {
    case SET_BONUS_TIME:
      if (action.seconds == null || action.seconds < 0) {
        return 0;
      }
      return action.seconds;
    default:
      return state;
  }
}

export function setMinimumTime(state = 0, action) {
  switch (action.type) {
    case SET_MINIMUM_TIME:
      if (action.seconds == null || action.seconds < 0) {
        return 0;
      }
      return action.seconds;
    default:
      return state;
  }
}
