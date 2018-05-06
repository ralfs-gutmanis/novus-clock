export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const TICK_TIME = 'TICK_TIME';
export const RESET_GAME = 'RESET_GAME';
export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';

const x = (p) => { throw new Error(`Missing parameter: ${p}`); };

export function changePlayer(
  currentPlayerIndex = x`currentPlayerIndex`,
  newTime = x`newTime`,
  bonusTime = x`bonusTime`,
) {
  return {
    type: CHANGE_PLAYER,
    currentPlayerIndex,
    newTime,
    bonusTime,
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

export function startGame() {
  return {
    type: START_GAME,
  };
}

export function stopGame() {
  return {
    type: STOP_GAME,
  };
}
