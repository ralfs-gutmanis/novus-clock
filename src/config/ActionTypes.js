export const SET_TIMER_MAX = 'SET_TIMER_MAX';
export const ENABLE_SOUND = 'ENABLE_SOUND';
export const ENABLE_VIBRATION = 'ENABLE_VIBRATION';
export const SET_SUDDEN_DEATH = 'SET_SUDDEN_DEATH';
export const SET_COMPENSATION = 'SET_COMPENSATION';
export const SET_OVERTIME = 'SET_OVERTIME';

export function setTimerMax(seconds) {
  return {
    type: SET_TIMER_MAX,
    seconds,
  };
}

export function enableSound(enabled) {
  return {
    type: ENABLE_SOUND,
    enabled,
  };
}

export function enableVibration(enabled) {
  return {
    type: ENABLE_VIBRATION,
    enabled,
  };
}

export function setSuddenDeath() {
  return {
    type: SET_SUDDEN_DEATH,
  };
}

export function setCompensation(seconds) {
  return {
    type: SET_COMPENSATION,
    seconds,
  };
}

export function setOvertime(seconds) {
  return {
    type: SET_OVERTIME,
    seconds,
  };
}
