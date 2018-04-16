export const SET_TIMER_MAX = 'SET_TIMER_MAX';
export const ENABLE_SOUND = 'ENABLE_SOUND';
export const ENABLE_VIBRATION = 'ENABLE_VIBRATION';

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
