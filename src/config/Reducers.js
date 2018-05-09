import {
  ENABLE_SOUND,
  ENABLE_VIBRATION,
  SET_TIMER_MAX,
  SET_SUDDEN_DEATH,
  SET_COMPENSATION,
  SET_OVERTIME,
} from './ActionTypes';
import { BonusTimeType } from './Constants';


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

export function setBonusTimeType(state = BonusTimeType.SuddenDeath, action) {
  switch (action.type) {
    case SET_SUDDEN_DEATH:
      return BonusTimeType.SuddenDeath;
    case SET_COMPENSATION:
      return BonusTimeType.Compensation;
    case SET_OVERTIME:
      return BonusTimeType.Overtime;
    default:
      return state;
  }
}

export function setCompensationTime(state = 4, action) {
  switch (action.type) {
    case SET_COMPENSATION:
      return action.seconds;
    default:
      return state;
  }
}

export function setOvertimeTime(state = 7, action) {
  switch (action.type) {
    case SET_OVERTIME:
      return action.seconds;
    default:
      return state;
  }
}
