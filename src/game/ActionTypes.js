export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const TICK_TIME = 'TICK_TIME';
export const RESET_GAME = 'RESET_GAME';
export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';

const x = (p) => { throw new Error(`Missing parameter: ${p}`); };

export function changePlayer(
  currentPlayerIndex = x`currentPlayerIndex`,
  newTime = x`newTime`,
  bonusTimeType = x`bonusTimeType`,
  compensationTime = x`compensationTime`,
  overtimeTime = x`overtimeTime`,
) {
  return {
    type: CHANGE_PLAYER,
    currentPlayerIndex,
    newTime,
    bonusTimeType,
    compensationTime,
    overtimeTime,
  };
}

export function tickTime(
  currentPlayerIndex = x`currentPlayerIndex`,
  newTime = x`newTime`,
) {
  return {
    type: TICK_TIME,
    currentPlayerIndex,
    newTime,
  };
}

export function resetGame(maxTime = x`maxTime`) {
  return {
    type: RESET_GAME,
    maxTime,
  };
}

export function startGame(currentPlayerIndex = x`currentPlayerIndex`) {
  return {
    type: START_GAME,
    currentPlayerIndex,
  };
}

export function stopGame() {
  return {
    type: STOP_GAME,
  };
}
